import type { Request, Response } from '~/types/express';
import { ILike, type FindManyOptions } from 'typeorm';

import z from 'zod';
import { StatusCodes } from 'http-status-codes';
import { Order } from '@repo/entities';
import { querySchema } from '~/modules/orders/schemas';

import { entities, logs, pagination } from '~/utils';

export default async function index(req: Request, res: Response<["auth", "pagination", "queryContext"]>) {

    const { limit, offset } = res.locals.pagination;
    const queryContext = res.locals.queryContext as z.infer<typeof querySchema> | undefined;

    const findOptions: FindManyOptions<Order> = {
        order: {
            createdAt: "DESC"
        }
    };

    if(queryContext && queryContext.search) {
        findOptions.where = {
            ...findOptions.where,
            id: ILike(`%${queryContext.search}%`),
            customerEmail: ILike(`%${queryContext.search}%`),
            customerName: ILike(`%${queryContext.search}`)
        };
    }

    const [orders, err] = await entities.indexAndCount<Order>(Order, {
        limit,
        offset,
        ...findOptions
    });

    if(err) {
        logs.error({ err, message: "Error indexing orders" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error indexing orders"
        });
    }

    if(!orders) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to index orders"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Order>(req, res, orders);

    return res.json(paginatedResponse);
};