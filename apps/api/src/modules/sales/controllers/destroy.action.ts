import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Sale } from '@repo/entities';
import { entities, logs } from '~/utils';

interface Params {
    id: string
};

export default async function destroy(req: Request, res: Response<["auth", "params"], Params>) {
    const [sale, err] = await entities.findOne<Sale>(Sale, {
        where: {
            id: res.locals.params.id
        },
        relations: {
            product: {
                details: true,
                media: true
            },
            event: {
                market: {
                    details: true
                }
            }
        }
    });

    if(err) {
        logs.error({ err, message: "Error finding sale" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding sale"
        });
    }

    if(!sale) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find sale"
        });
    }

    const [deletedSale, deleteErr] = await entities.destroy<Sale>(Sale, sale);

    if(deleteErr) {
        logs.error({ err: deleteErr, message: "Error deleting sale" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding sale"
        });
    }

    if(!deletedSale) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to delete sale"
        });
    }

    return res.json({ results: sale });
};