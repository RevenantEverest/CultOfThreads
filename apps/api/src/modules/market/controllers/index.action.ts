import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Market } from '@repo/entities';

import { entities, logs, pagination } from '~/utils';

export default async function index(req: Request, res: Response<["auth", "pagination"]>) {

    const { limit, offset } = res.locals.pagination;

    const [markets, err] = await entities.indexAndCount<Market>(Market, {
        limit, 
        offset, 
        relations: {
            details: true
        },
        order: {
            createdAt: "DESC"
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error indexing markets"
        });
    }

    if(!markets) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to index markets"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Market>(req, res, markets);

    return res.json(paginatedResponse);
};