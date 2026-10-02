import type { FindOneOptions } from 'typeorm';
import type { 
    SyncPaymentProviderOptions,
    ProviderDetails
} from '~/modules/products/helpers/syncPaymentProviders/types';

import { Product, ProductProviderDetails } from '@repo/entities';

import { ENV } from '~/constants';
import { entities, logs } from '~/utils';

import createPaymentProviderItems from './createProviderItems.helper';
import updatePaymentProviderItems from './updateProviderItems.helper';
import destroyPaymentProviderItems from './destroyProviderItems.helper';

export * from '~/modules/products/helpers/syncPaymentProviders/types';

type Options = SyncPaymentProviderOptions;
interface UpdateInternalProductPayload {
    product: Product,
    providerDetails: ProviderDetails
};

/*
    An edge case exists where Stripe or Square properly create a product on their end but
    our database update transaction fails.

    We can either hedge against this with a retry system, a cron job that utilizes a separate DB table to store
    orphaned Stripe/Square products, or post a message using another 3rd party infra.

    We should also log to a text file, just on the off chance that everything is down <- Done
*/

async function updateInternalProduct(payload: UpdateInternalProductPayload) {
    const { product, providerDetails } = payload;

    const findOptions: FindOneOptions<ProductProviderDetails> = {
        where: {
            product: {
                id: product.id
            }
        }
    };
    const [updatedProviderDetails, updateErr] = await entities.findAndSaveOrUpdate<ProductProviderDetails>(ProductProviderDetails, findOptions, {
        ...product.providerDetails,
        ...providerDetails,
        product: {
            id: product.id
        }
    });

    if(updateErr) {
        logs.error({ err: updateErr, message: "Failed to assign Stripe/Square product id to product entity" });
        logFailedAssignment();
    }

    if(!updatedProviderDetails) {
        logFailedAssignment();
    }

    function logFailedAssignment() {
        logs.log({
            toFile: true,
            message: 
                "Failed to assign Stripe/Square product id to product entity.\n" +
                "---\n" +
                `- Internal product id: ${product.id}\n` +
                `- Square product id: ${providerDetails.squareProductId}\n` +
                `- Stripe product id: ${providerDetails.stripeProductId}\n`
        });
    };
};

export default async function syncPaymentProviders(product: Product, options: Options) {

    const stripeImages = product.media
    .filter((item, index) => item.type.startsWith("image/") && index <= 7)
    .map((item) => ENV.SUPABASE_STORAGE_URL + item.mediaUrl);

    switch(options.actionType) {
        case "create":
            const createdProviderDetails = await createPaymentProviderItems(product, stripeImages, options);
            if(createdProviderDetails) {
                await updateInternalProduct({ product, providerDetails: createdProviderDetails });
            }
            break;
        case "update":
            const updatedProviderDetails = await updatePaymentProviderItems(product, stripeImages, options);
            if(updatedProviderDetails) {
                await updateInternalProduct({ product, providerDetails: updatedProviderDetails })
            }
            break;
        case "destroy":
            await destroyPaymentProviderItems(product);
            await updateInternalProduct({ 
                product, 
                providerDetails: {
                    stripeProductId: null,
                    stripePriceId: null,
                    squareProductId: null
                }
            });
            break;
    }
};