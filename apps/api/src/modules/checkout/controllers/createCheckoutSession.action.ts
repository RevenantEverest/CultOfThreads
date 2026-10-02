import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Any } from 'typeorm';
import { z } from 'zod';

import { stripeClient } from '~/integrations/stripe';

import { Order, Product } from '@repo/entities';
import { createCheckoutSchema } from '~/modules/checkout/schemas';
import addOrderLineItems from '~/modules/checkout/helpers/addOrderLineItems.helper';

import { entities, logs } from '~/utils';
import { ENV } from '~/constants';
import { SHIPPING_OPTIONS } from '~/integrations/stripe/constants';

type Body = z.infer<typeof createCheckoutSchema>;

interface StripeLineItem {
    quantity: number,
    price: string // stripe price id
};

interface CartProduct extends StripeLineItem {
    productId: string,
    name: string
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
            name: true,
            details: {
                onlinePrice: true
            },
            providerDetails: true
        },
        where: {
            id: Any(validatedBody.data.items.map((item) => item.productId))
        },
        relations: {
            details: true,
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

    const [order, orderErr] = await entities.insert<Order>(Order, {
        status: "PENDING",
        tokensValidBefore: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        ...(validatedBody.data.notes && { customerNotes: validatedBody.data.notes })
    });

    if(orderErr) {
        logs.error({ err: orderErr, message: "Error creating internal order" });
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error creating internal order"
        });
    }

    if(!order) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to create internal order"
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
    const cartProducts: CartProduct[] = [];
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
        });

        cartProducts.push({
            productId: cartProduct.id,
            name: cartProduct.name,
            quantity: item.quantity,
            price: (cartProduct.details.onlinePrice * item.quantity).toLocaleString(),
        });
    }

    await addOrderLineItems(
        order, 
        cartProducts.map((item) => {
            return { 
                productId: item.productId, 
                price: Number(item.price), 
                quantity: item.quantity 
            }
        })
    );

    if(missingPriceProductIds.length > 0) {
        logs.log({ message: `Some cart products are missing a Stripe price ID:\n ${missingPriceProductIds.join(" ")}` })
    }

    try {
        const session = await stripeClient.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            shipping_address_collection: {
                allowed_countries: ["US", "CA"]
            },
            shipping_options: [
                { shipping_rate: SHIPPING_OPTIONS.STANDARD.id },
                { shipping_rate: SHIPPING_OPTIONS.EXPRESS.id }
            ],
            billing_address_collection: "required",
            automatic_tax: {
                enabled: true
            },
            success_url: `${ENV.FRONTEND_URL}/shop/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${ENV.FRONTEND_URL}/shop`,
            metadata: {
                cartProducts: JSON.stringify(cartProducts),
                internalOrderId: order.id
            }, // data used for webhook from stripe on payment complete
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60 // 30 min after creation (can't be lower than 30)
        });

        const [_, updateErr] = await entities.update<Order>(Order, {
            ...order,
            stripeCheckoutSessionId: session.id
        });

        if(updateErr) {
            logs.error({ 
                err: updateErr, 
                message: (
                    `Error adding session id to order\n` +
                    `Order ID: ${order.id}\n` +
                    `Session ID: ${session.id}`
                ),
                toFile: true
            });
        }

        return res.json({ 
            results: {
                url: session.url
            }
        });
    }
    catch(err) {
        
        await entities.update<Order>(Order, {
            ...order,
            status: "FAILED"
        });

        logs.error({ err: err as Error, message: `Failed to create checkout session for order ${order.id}`, toFile: true });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Failed to create checkout session"
        });
    }
    
};