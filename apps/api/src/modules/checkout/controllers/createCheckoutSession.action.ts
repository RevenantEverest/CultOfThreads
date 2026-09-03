import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Any } from 'typeorm';
import { z } from 'zod';

import { createCheckoutSchema } from '~/modules/checkout/schemas';

import { stripeClient } from '~/integrations/stripe';
import { entities, logs } from '~/utils';
import { Product } from '@repo/entities';
import { ENV } from '~/constants';

type Body = z.infer<typeof createCheckoutSchema>;

interface StripeLineItem {
    quantity: number,
    price: string // stripe price id
};

interface StripeShippingOption {
    shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: {
            amount: number,
            currency: string
        },
        display_name: string,
        delivery_estimate: {
            minimum: {
                unit: string, value: number
            },
            maximum: {
                unit: string, value: number
            }
        }
    }
};

export default async function createCheckoutSession(req: Request<Body>, res: Response) {

    const validatedBody = await createCheckoutSchema.safeParseAsync(req.body);

    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const [products, findErr] = await entities.find<Product>(Product, {
        select: {
            id: true,
            providerDetails: true
        },
        where: {
            id: Any(validatedBody.data.items.map((item) => item.productId))
        },
        relations: {
            providerDetails: true
        }
    });

    if(findErr) {
        logs.error({ err: findErr });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error fetching cart products for checkout"
        });
    }

    if(!products || products.length <= 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to fetch cart products for checkout"
        });
    }

    const requestedProductIds = validatedBody.data.items.map((item) => item.productId);

    if(products.length !== requestedProductIds.length) {
        const foundIds = new Set(products.map((product) => product.id));
        const missingIds = requestedProductIds.filter((id) => !foundIds.has(id));

        logs.log({ message: `Some cart products were not found for checkout:\n ${missingIds.join(" ")}` });
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Some items in your cart are no longer available"
        });
    }

    const lineItems: StripeLineItem[] = [];
    const missingPriceProductIds: string[] = [];

    for(const item of validatedBody.data.items) {
        const cartProduct = products.find((product) => product.id === item.productId);
        const stripePriceId = cartProduct?.providerDetails.stripePriceId;

        if(!stripePriceId) {
            missingPriceProductIds.push(item.productId);
            continue;
        }

        lineItems.push({
            quantity: item.quantity,
            price: stripePriceId
        })
    }

    if(missingPriceProductIds.length > 0) {
        logs.log({ message: `Some cart products are missing a Stripe price ID:\n ${missingPriceProductIds.join(" ")}` })
    }

    const shippingRates: StripeShippingOption[] = [
        {
            shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 0, currency: "usd" },
                display_name: "Standard Shipping",
                delivery_estimate: {
                    minimum: { unit: "business_day", value: 7 },
                    maximum: { unit: "business_day", value: 14 }
                }
            }
        },
        {
            shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 50  * 100, currency: "usd" },
                display_name: "Express Shipping",
                delivery_estimate: {
                    minimum: { unit: "business_day", value: 1 },
                    maximum: { unit: "business_day", value: 7 }
                }
            }
        }
    ];

    try {
        const session = await stripeClient.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            shipping_address_collection: {
                allowed_countries: ["US", "CA"]
            },
            shipping_options: shippingRates,
            billing_address_collection: "required",
            automatic_tax: {
                enabled: true
            },
            success_url: `${ENV.FRONTEND_URL}/shop/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${ENV.FRONTEND_URL}/shop/checkout/cancel`,
            metadata: {} // data used for webhook from stripe on payment complete
        });

        return res.json({ 
            results: {
                url: session.url
            }
        });
    }
    catch(err) {
        logs.error({ err: err as Error, message: "Failed to create checkout session" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Failed to create checkout session"
        });
    }
    
};