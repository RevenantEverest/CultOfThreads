import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { TrafficAnalytics } from '@repo/entities';

import { entities, logs, pagination } from '~/utils';

export default async function index(req: Request, res: Response<["auth", "pagination"]>) {

    const { limit, offset } = res.locals.pagination;

    const [trafficAnalytics, err] = await entities.indexAndCount<TrafficAnalytics>(TrafficAnalytics, {
        limit,
        offset,
        order: {
            createdAt: "DESC"
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error indexing traffic analytics"
        });
    }

    if(!trafficAnalytics) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to index traffic analytics"
        });
    }

    const paginatedResponse = pagination.paginateResponse<TrafficAnalytics>(req, res, trafficAnalytics);

    return res.json(paginatedResponse);
};