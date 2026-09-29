import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Order } from '@repo/entities';
import { render, OrderTracking } from '@repo/email-templates';

import { sendEmail } from '~/integrations/zoho/actions';

import { ENV } from '~/constants';
import { entities, logs } from '~/utils';

interface Params {
    id: string
};

export default async function sendTrackingEmail(req: Request, res: Response<["auth", "params"], Params>) {

    const [order, findErr] = await entities.findOne<Order>(Order, {
        where: {
            id: res.locals.params.id
        },
        relations: {
            orderLineItems: {
                product: true
            }
        }
    });

    if(findErr) {
        logs.error({ err: findErr, message: "Error finding order" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding order"
        });
    }

    if(!order) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find order"
        });
    }

    const lineItems = order.orderLineItems.map((item) => {
        return {
            name: item.product.name,
            quantity: item.quantity,
            price: item.purchasePriceSnapshot.toString()
        };
    });

    try {
        const trackingUrl = `https://www.ups.com/track?loc=en_US&requester=QUIC&tracknum=${order.trackingNumber}/trackdetails`;
        const html = await render(OrderTracking({
            trackingNumber: order.trackingNumber,
            trackingUrl,
            customerName: order.customerName.split(" ")[0] ?? "Fellow Cultist",
            orderNumber: order.id,
            items: lineItems,
            total: `${((order.amountTotalInCents ?? 0) / 100).toLocaleString()}`,
            orderUrl: `${ENV.FRONTEND_URL}/orders?view=${order?.id}&token=${"some token"}`
        }));
        await sendEmail({
            to: order.customerEmail,
            subject: `Your order has shipped`,
            htmlContent: html
        });

        return res.sendStatus(StatusCodes.OK);
    }
    catch(err) {
        logs.error({ err: err as Error, message: "Error sending tracking email" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error sending tracking email"
        });
    }
};