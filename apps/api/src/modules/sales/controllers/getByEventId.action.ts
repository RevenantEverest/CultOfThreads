import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Sale } from '@repo/entities';
import { entities, logs } from '~/utils';

interface Params {
    id: string
};

export default async function getByEventId(req: Request, res: Response<["auth", "params"], Params>) {
    const [sales, err] = await entities.find<Sale>(Sale, {
        where: {
            event: {
                id: res.locals.params.id
            }
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

    if(!sales) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find sale"
        });
    }

    console.log(sales)

    return res.json({ results: sales });
};