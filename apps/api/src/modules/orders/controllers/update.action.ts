import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Order } from '@repo/entities';
import { updateSchema } from '~/modules/orders/schemas';

import { entities, logs } from '~/utils';

type Body = z.infer<typeof updateSchema>;
type Params = {
    id: string
};

export default async function update(req: Request<Body>, res: Response<["auth", "params"], Params>) {

    const validatedBody = await updateSchema.safeParseAsync(req.body);

    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const [order, err] = await entities.findOne<Order>(Order, {
        where: {
            id: res.locals.params.id
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

    const { 
        status, 
        customerEmail, 
        customerName, 
        billingAddress, 
        shippingAddress, 
        trackingNumber
    } = validatedBody.data;
    const [updatedOrder, updateErr] = await entities.update<Order>(Order, {
        ...order,
        status,
        customerEmail: customerEmail ?? order.customerEmail,
        customerName: customerName ?? order.customerName,
        billingAddress: billingAddress ?? order.billingAddress,
        shippingAddress: shippingAddress ?? order.shippingAddress,
        trackingNumber: trackingNumber ?? order.trackingNumber
    });

    if(updateErr) {
        logs.error({ err: updateErr, message: "Error updating order" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error updating order"
        });
    }

    if(!updatedOrder) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to update event"
        });
    }

    return res.json({ results: updatedOrder });
};