import type { Product } from '@repo/entities';
import type { CatalogObject } from 'square';
import type { 
    ProviderDetails,
    SyncPaymentProviderOptions
} from '~/modules/products/helpers/syncPaymentProviders/types';

import * as stripe from '~/integrations/stripe';
import * as square from '~/integrations/square';

import { logs } from '~/utils';

type Options = SyncPaymentProviderOptions;
interface UpdatedProviderItems {
    stripeProduct?: number,
    squareProduct?: CatalogObject
};

interface UpdatedStripeProduct {
    newPriceId?: string
};

async function updateStripeProviderItem(product: Product, images: string[], options?: Options): Promise<UpdatedStripeProduct> {
    const responseData: UpdatedStripeProduct = {};
    
    const [_, stripeErr] = await stripe.actions.updateProduct({
        productId: product.providerDetails.stripeProductId as string,
        name: product.name,
        active: product.details.status === "ACTIVE",
        images
    });

    if(stripeErr) {
        logs.error({ err: stripeErr, message: `Failed to update Stripe product for ${product.providerDetails.stripeProductId}` });
    }

    if(options && options.hasOnlinePriceChange) {
        const [stripePriceRes, stripePriceErr] = await stripe.actions.updateProductPrice({
            productId: product.id,
            updatedPriceInCents: product.details.onlinePrice * 100
        });

        if(stripePriceErr) {
            logs.error({ err: stripePriceErr, message: `Failed to update Stripe product price for ${product.providerDetails.stripeProductId}` });
        }
        
        if(stripePriceRes) {
            responseData.newPriceId = stripePriceRes.newPriceId;
        }
    }

    return responseData;
};

async function updateSquareProviderItem(product: Product, options?: Options): Promise<CatalogObject | undefined> {
    if(!product.providerDetails.squareProductId) {
        return undefined;        
    }

    const [squareRes, squareErr] = await square.actions.updateCatalogItem({
        catalogItemId: product.providerDetails.squareProductId,
        name: product.name,
        price: {
            amount: BigInt(product.details.marketPrice * 100),
            currency: "USD"
        }
    });

    if(squareErr) {
        logs.error({ err: squareErr, message: `Failed to update Square product for ${product.providerDetails.squareProductId}` });
    }

    return squareRes as CatalogObject | undefined;
};

export default async function updatePaymentProviderItem(product: Product, images: string[], options?: Options): Promise<ProviderDetails> {

    const providerDetails: ProviderDetails = {
        stripeProductId: product.providerDetails ? product.providerDetails.stripeProductId : null,
        stripePriceId: product.providerDetails ? product.providerDetails.stripePriceId : null,
        squareProductId: product.providerDetails ? product.providerDetails.squareProductId : null,
    };

    if(options?.providerTargets && options.providerTargets.includes("STRIPE")) {
        const { newPriceId } = await updateStripeProviderItem(product, images, options);

        if(newPriceId) {
            providerDetails.stripePriceId = newPriceId;
        }
    }

    if(options?.providerTargets && options.providerTargets.includes("SQUARE")) {
        await updateSquareProviderItem(product, options);
    }

    return providerDetails;
};