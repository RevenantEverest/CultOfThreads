import type { Request, Response } from '~/types/express';

import { ILike, type FindManyOptions } from 'typeorm';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { Sale } from '@repo/entities';
import { querySchema } from '~/modules/sales/schemas';

import { entities, logs, pagination } from '~/utils';

export default async function index(req: Request, res: Response<["auth", "pagination", "queryContext"]>) {
        
    const { limit, offset } = res.locals.pagination;
    const queryContext = res.locals.queryContext as z.infer<typeof querySchema> | undefined;

    const findOptions: FindManyOptions<Sale> = {
        order: {
            createdAt: "DESC"
        }
    };

    if(queryContext && queryContext.search) {
        findOptions.where = {
            ...findOptions.where,
            id: ILike(`%${queryContext.search}%`),
            productName: ILike(`%${queryContext.search}%`),
            product: {
                name: ILike(`%${queryContext.search}%`),
            },
            marketName: ILike(`%${queryContext.search}%`),
            event: {
                market: {
                    name: ILike(`%${queryContext.search}%`)
                }
            }
        };
    }

    const [sales, err] = await entities.indexAndCount<Sale>(Sale, {
        limit,
        offset,
        ...findOptions
    });

    if(err) {
        logs.error({ err, message: "Error indexing sales" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error indexing sales"
        });
    }

    if(!sales) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to index sales"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Sale>(req, res, sales);

    return res.json(paginatedResponse);
};