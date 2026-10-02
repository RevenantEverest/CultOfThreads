import type { PromiseTuple } from '~/types/promises';
import { stripeClient } from '~/integrations/stripe/stripeClient';

interface ArchivePayload {
    productId: string
};

export default async function archiveProduct({ productId }: ArchivePayload): PromiseTuple<number> {
    try {
        const stripeProduct = await stripeClient.products.retrieve(productId);

        if(typeof stripeProduct.default_price === "string") {
            await stripeClient.prices.update(stripeProduct.default_price, {
                active: false
            });
        }

        const archivedProduct = await stripeClient.products.update(productId, {
            active: false
        });

        return [archivedProduct.updated, undefined];
    }
    catch(err) {
        return [undefined, err as Error];
    }
};