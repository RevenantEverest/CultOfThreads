import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { MoreThanOrEqual } from 'typeorm';
import { Event } from '@repo/entities';

import { entities, logs } from '~/utils';

export default async function getUpcoming(req: Request, res: Response) {

    const now = new Date();

    const [events, err] = await entities.find<Event>(Event, {
        where: {
            dateFrom: MoreThanOrEqual(now)
        },
        take: 3,
        order: {
            dateFrom: "ASC"
        },
        select: {
            id: true,
            address: true,
            dateFrom: true,
            dateTo: true,
            flyerUrl: true,
            market: {
                name: true
            }
        },
        relations: {
            market: true
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding events"
        });
    }

    if(!events) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find events"
        });
    }

    return res.json({ results: events });
};