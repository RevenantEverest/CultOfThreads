import type { PromiseTuple } from '~/types/promises';
import { stripeClient } from '~/integrations/stripe/stripeClient';

interface UpdatePayload {
    productId: string,
    updatedPriceInCents: number,
    currencyIso?: string,
};

interface UpdatedStripeProduct {
    productId: string,
    newPriceId: string,
    archivedPriceId: string
};

export default async function updatePrice(payload: UpdatePayload): PromiseTuple<UpdatedStripeProduct> {

    try {
        const { productId, updatedPriceInCents, currencyIso="usd" } = payload;

        if(!Number.isInteger(updatedPriceInCents) || updatedPriceInCents < 0) {
            throw new Error(`'updatedPriceInCents' must be a non-negative integer, got: ${updatedPriceInCents}`);
        }

        const stripeProduct = await stripeClient.products.retrieve(productId);

        if(!stripeProduct.default_price || typeof stripeProduct.default_price !== "string") {
            throw new Error(`Stripe Product ${stripeProduct.id} retrieved without a resolvable 'default_price'`);
        }

        const oldPriceId = stripeProduct.default_price;

        // Stripe Prices are immutable on existing Price objects so we create a new one instead.
        const newPrice = await stripeClient.prices.create({
            product: productId,
            currency: currencyIso,
            unit_amount: updatedPriceInCents,
        });

        await stripeClient.products.update(productId, {
            default_price: newPrice.id,
        });

        // Deactivate the old price so it can't be used for new Checkout Sessions/Payment Links,
        // while leaving it intact for past orders/invoices that still reference it.
        await stripeClient.prices.update(oldPriceId, {
            active: false,
        });

        const data: UpdatedStripeProduct = {
            productId,
            newPriceId: newPrice.id,
            archivedPriceId: oldPriceId
        };

        return [data, undefined];
    }
    catch(err) {
        return [undefined, err as Error];
    }
};