import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Event } from '@repo/entities';

import { entities, logs } from '~/utils';

interface Params {
    id: string
};

export default async function getOne(req: Request, res: Response<["auth", "params"], Params>) {

    const [event, err] = await entities.findOne<Event>(Event, {
        where: {
            id: res.locals.params.id
        },
        relations: {
            market: true
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding event"
        });
    }

    if(!event) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find event"
        });
    }

    return res.json({ results: event });
};