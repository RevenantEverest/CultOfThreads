import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Event } from '@repo/entities';

import { entities, logs, supabaseStorage } from '~/utils';

interface Params {
    id: string
};

export default async function destroy(req: Request, res: Response<["auth", "params"], Params>) {

    const [event, err] = await entities.findOne<Event>(Event, {
        where: {
            id: res.locals.params.id
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

    if(event.flyerUrl) {
        await supabaseStorage.destroy({
            fullFilePath: event.flyerUrl
        });
    }

    const [deletedEntity, deleteErr] = await entities.destroy<Event>(Event, event);

    if(deleteErr) {
        logs.error({ err: deleteErr });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error deleting event"
        });
    }

    if(!deletedEntity) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to delete event"
        });
    }

    return res.json({ results: deletedEntity });
};