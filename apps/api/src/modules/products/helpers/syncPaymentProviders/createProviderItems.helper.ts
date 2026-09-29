import type { Product } from '@repo/entities';
import type { ProviderDetails, SyncPaymentProviderOptions } from '~/modules/products/helpers/syncPaymentProviders/types';
import type { CreatedStripeProduct } from '~/integrations/stripe/actions/createProduct.action';
import type { CreatedSquareProduct } from '~/integrations/square/actions/createCatalogItem.action';

import * as stripe from '~/integrations/stripe';
import * as square from '~/integrations/square';

import { logs } from '~/utils';
import { randomUUID } from 'crypto';

type Options = SyncPaymentProviderOptions;

async function createStripeProviderItem(product: Product, images?: string[], options?: Options): Promise<Partial<CreatedStripeProduct>> {
    const [stripeProduct, stripeErr] = await stripe.actions.createProduct({
        id: randomUUID(),
        name: product.name,
        active: product.details.status === "ACTIVE",
        defaultPriceInCents: product.details.onlinePrice * 100,
        images: images
    });

    if(stripeErr) {
        logs.error({ err: stripeErr, message: "Failed to create Stripe product" });
    }

    return {
        productId: stripeProduct?.productId,
        defaultPriceId: stripeProduct?.defaultPriceId
    };
};

async function createSquareProviderItem(product: Product, options?: Options): Promise<Partial<CreatedSquareProduct>> {
    const [squareProduct, squareErr] = await square.actions.createCatalogItem({
        name: product.name,
        defaultPriceInCents: product.details.marketPrice * 100
    });

    if(squareErr) {
        logs.error({ err: squareErr, message: "Failed to create Square product" });
    }

    return {
        catalogItemId: squareProduct?.catalogItemId
    };
};

export default async function createPaymentProviderItem(product: Product, images?: string[], options?: Options): Promise<ProviderDetails> {

    const providerDetails: ProviderDetails = {
        stripeProductId: null,
        stripePriceId: null,
        squareProductId: null
    };

    if(options?.providerTargets && options.providerTargets.includes("STRIPE")) {
        const { productId, defaultPriceId } = await createStripeProviderItem(product, images, options);
        if(productId) {
            providerDetails.stripeProductId = productId;
        }

        if(defaultPriceId) {
            providerDetails.stripePriceId = defaultPriceId;
        }
    }

    if(options?.providerTargets && options.providerTargets.includes("SQUARE")) {
        const { catalogItemId } = await createSquareProviderItem(product, options);
        
        if(catalogItemId) {
            providerDetails.squareProductId = catalogItemId;
        }
    }

    return providerDetails;
};