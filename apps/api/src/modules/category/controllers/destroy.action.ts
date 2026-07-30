import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Category } from '@repo/entities';

import { entities, logs } from '~/utils';

interface Params {
    id: string
};

export default async function destroy(req: Request, res: Response<["auth", "params"], Params>) {

    const [category, err] = await entities.findOne<Category>(Category, {
        where: {
            id: res.locals.params.id
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding category"
        });
    }

    if(!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find category"
        });
    }

    const [deletedEntity, deleteErr] = await entities.destroy<Category>(Category, category);

    if(deleteErr) {
        logs.error({ err: deleteErr });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error deleting category"
        });
    }

    if(!deletedEntity) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to delete category"
        });
    }

    return res.json({ results: deletedEntity });
};