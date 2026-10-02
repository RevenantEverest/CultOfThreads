import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Order } from '@repo/entities';

import { entities, logs } from '~/utils';

interface Params {
    id: string
};

export default async function getOne(req: Request, res: Response<["auth", "params"], Params>) {

    const [order, err] = await entities.findOne<Order>(Order, {
        where: {
            id: res.locals.params.id
        },
        relations: {
            orderLineItems: {
                product: true
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

    return res.json({ results: order });
};