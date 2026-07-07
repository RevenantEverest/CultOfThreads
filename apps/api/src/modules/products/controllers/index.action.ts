import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Product } from '@repo/entities';

import { entities, logs, pagination } from '~/utils';

export default async function index(req: Request, res: Response<["auth", "pagination"]>) {

    const { limit, offset } = res.locals.pagination;

    const [products, err] = await entities.indexAndCount<Product>(Product, {
        limit,
        offset,
        order: {
            createdAt: "DESC"
        },
        relations: {
            details: true,
            media: true,
            tags: {
                tag: true
            },
            categories: {
                category: true
            }
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error indexing products"
        });
    }

    if(!products) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to index products"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Product>(req, res, products);

    return res.json(paginatedResponse);
};