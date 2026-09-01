import type { PromiseTuple } from '~/types/promises';
import { stripeClient } from '~/integrations/stripe/stripeClient';

interface CreatePayload {
    id: string,
    name: string,
    active: boolean,
    defaultPriceInCents: number,
    currencyIso?: string,
    images?: string[]
};

export interface CreatedStripeProduct {
    productId: string,
    defaultPriceId: string
};

export default async function createProduct(payload: CreatePayload): PromiseTuple<CreatedStripeProduct> {
    try {
        const { 
            id, 
            name, 
            active, 
            defaultPriceInCents, 
            images, 
            currencyIso="usd" 
        } = payload;

        if(!Number.isInteger(defaultPriceInCents) || defaultPriceInCents < 0) {
            throw new Error(`'defaultPriceInCents' must be a non-negative integer, got: ${defaultPriceInCents}`);
        }

        const stripeProduct = await stripeClient.products.create({
            id, name, active,
            default_price_data: {
                currency: currencyIso,
                unit_amount: defaultPriceInCents
            },
            expand: ["default_price"],
            ...(images && { images })
        });

        if(!stripeProduct.default_price || typeof stripeProduct.default_price === "string") {
            throw new Error(`Stripe Product ${stripeProduct.id} created without a resolvable 'default_price'`);
        }

        const data: CreatedStripeProduct = {
            productId: stripeProduct.id,
            defaultPriceId: stripeProduct.default_price.id
        };

        return [data, undefined];
    }
    catch(err) {
        return [undefined, err as Error];
    }    
};