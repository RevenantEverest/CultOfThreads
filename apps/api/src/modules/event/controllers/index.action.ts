import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Event } from '@repo/entities';

import { entities, logs, pagination } from '~/utils';

export default async function index(req: Request, res: Response<["auth", "pagination"]>) {

    const { limit, offset } = res.locals.pagination;

    const [events, err] = await entities.indexAndCount<Event>(Event, {
        limit,
        offset,
        order: {
            dateFrom: "DESC"
        },
        relations: {
            market: {
                details: true
            }
        }
    });
    
    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error indexing events"
        });
    }

    if(!events) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to index events"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Event>(req, res, events);

    return res.json(paginatedResponse);
};