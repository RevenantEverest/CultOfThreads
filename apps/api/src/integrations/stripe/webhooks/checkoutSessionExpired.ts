import { Order } from '@repo/entities';
import Stripe from 'stripe';
import { entities, logs } from '~/utils';

export default async function checkoutSessionExpired(session: Stripe.Checkout.Session) {

    const [order, findErr] = await entities.findOne<Order>(Order, {
        where: {
            stripeCheckoutSessionId: session.id,
            status: "PENDING"
        }
    });

    if(findErr) {
        return logs.error({ err: findErr, message: "Error searching for order in checkout session expired" });
    }

    if(!order) {
        logs.log({
            message: (
                `No order returned from checkout session expired.\n` +
                `Session ID: ${session.id}`
            ),
            toFile: true
        })
        return;
    }

    const [_, updateErr] = await entities.update<Order>(Order, {
        ...order,
        status: "CANCELLED"
    });

    if(updateErr) {
        return logs.error({ 
            err: updateErr, 
            message: (
                "Error updating order in checkout session expired.\n" +
                `Order ID: ${order.id}\n` +
                `Session ID: ${session.id}`
            ) 
        });
    }
};