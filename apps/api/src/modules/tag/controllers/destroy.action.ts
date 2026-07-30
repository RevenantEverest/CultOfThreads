import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Tag } from '@repo/entities';

import { entities, logs } from '~/utils';

interface Params {
    id: string
};

export default async function destroy(req: Request, res: Response<["auth", "params"], Params>) {

    const [tag, err] = await entities.findOne<Tag>(Tag, {
        where: {
            id: res.locals.params.id
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding tag"
        });
    }

    if(!tag) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find tag"
        });
    }

    const [deletedEntity, deleteErr] = await entities.destroy<Tag>(Tag, tag);

    if(deleteErr) {
        logs.error({ err: deleteErr });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error deleting tag"
        });
    }

    if(!deletedEntity) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to delete tag"
        });
    }

    return res.json({ results: deletedEntity });
};