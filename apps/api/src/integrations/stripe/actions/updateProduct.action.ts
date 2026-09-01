import type { PromiseTuple } from '~/types/promises';
import { stripeClient } from '~/integrations/stripe/stripeClient';

interface UpdatePayload {
    productId: string,
    active: boolean,
    name?: string,
    images?: string[]
};

export default async function updateProduct({ productId, name, active, images }: UpdatePayload): PromiseTuple<number> {
    try {
        if(name === undefined && images === undefined) {
            throw new Error("'updateProduct' called with no fields to update");
        }

        if(images && images.length > 8) {
            throw new Error(`Stripe products support a maximum of 8 images, got: ${images.length}`)
        }

        const stripeProduct = await stripeClient.products.update(
            productId,
            {
                ...(name && { name }),
                ...(images && { images }),
                active
            }
        );

        return [stripeProduct.updated, undefined];
    }
    catch(err) {
        return [undefined, err as Error];
    }
};