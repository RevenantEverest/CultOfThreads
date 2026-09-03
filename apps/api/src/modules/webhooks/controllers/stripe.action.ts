import type { Request, Response } from 'express';
import type Stripe from 'stripe';

import { StatusCodes } from 'http-status-codes';
import { stripeClient, webhooks as stripeWebhooks } from '~/integrations/stripe';

import { logs } from '~/utils';
import { ENV } from '~/constants';

export default async function stripe(req: Request, res: Response) {
    const signature = req.headers["stripe-signature"];

    if(!signature) {
        logs.log({ message: "Stripe webhook missing signature header" });
        return res.status(StatusCodes.BAD_REQUEST).send("Missing signature");
    }

    let event: Stripe.Event;

    try {
        event = await stripeClient.webhooks.constructEventAsync(
            req.body,
            signature,
            ENV.STRIPE_WEBHOOK_SECRET
        )
    }
    catch(err) {
        logs.error({ err: err as Error, message: "Stripe webhook signature verification failed" })
        return res.sendStatus(StatusCodes.BAD_REQUEST).send(`Webhook Error: ${(err as Error).message}`);
    }

    res.status(StatusCodes.OK).json({ received: true });

    
    try {
        switch(event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                await stripeWebhooks.checkoutSessionCompleted(session);
                break;
            }
            default: {
                logs.log({ message: `Unhandled Stripe event type ${event.type}` });
            }
        }
    }
    catch(err) {
        logs.error({ err: err as Error, message: `Failed to handle Stripe event: ${event.type}` })
    }
};