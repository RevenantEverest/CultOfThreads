import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Market } from '@repo/entities';

import { entities, logs } from '~/utils';

interface Params {
    id: string
};

export default async function getOne(req: Request, res: Response<["auth", "params"], Params>) {

    const [market, err] = await entities.findOne<Market>(Market, {
        where: {
            id: res.locals.params.id
        },
        relations: {
            details: true
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding market"
        });
    }

    if(!market) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find market"
        });
    }

    return res.json({ results: market });
};