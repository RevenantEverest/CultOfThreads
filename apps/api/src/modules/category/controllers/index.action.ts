import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Category } from '@repo/entities';

import { entities, logs, pagination } from '~/utils';

export default async function index(req: Request, res: Response<["auth", "pagination"]>) {

    const { limit, offset } = res.locals.pagination;

    const [categories, err] = await entities.indexAndCount<Category>(Category, {
        limit,
        offset,
        order: {
            name: "ASC"
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error indexing categories"
        });
    }

    if(!categories) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to index categories"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Category>(req, res, categories);

    return res.json(paginatedResponse);
};