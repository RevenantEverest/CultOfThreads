import type { Request, Response } from '~/types/express';

import { Order } from '@repo/entities';
import { StatusCodes } from 'http-status-codes';
import { entities, logs } from '~/utils';

export default async function getByOrderToken(req: Request, res: Response<["orderAuth"]>) {

    const { orderId } = res.locals.orderAuth;

    if(!orderId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: true, message: "Unauthorized" });
    }

    const [order, err] = await entities.findOne<Order>(Order, {
        where: {
            id: orderId
        },
        select: {
            id: true,
            status: true,
            customerEmail: true,
            customerName: true,
            billingAddress: true,
            shippingAddress: true,
            shippingOptionName: true,
            shippingAmountInCents: true,
            trackingNumber: true,
            amountTotalInCents: true,
            amountSubtotalInCents: true,
            taxCollectedInCents: true,
            customerNotes: true,
            orderLineItems: {
                id: true,
                quantity: true,
                purchasePriceSnapshot: true,
                product: {
                    id: true,
                    name: true,
                    description: true,
                    media: true
                }
            }
        },
        relations: {
            orderLineItems: {
                product: {
                    media: true
                }
            }
        }
    });

    if(err) {
        logs.error({ err, message: "Error finding order" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding order"
        });
    }

    if(!order) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find order"
        });
    }

    const isTokenStillValid = order.tokensValidBefore ? new Date() < new Date(order.tokensValidBefore) : true;

    if(!isTokenStillValid) {
        logs.log({ message: `Order attempted to be viewed when token no longer valid, for order ${order.id}` });
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: true, message: "Unauthorized"
        });
    }

    return res.json({ results: order });
};