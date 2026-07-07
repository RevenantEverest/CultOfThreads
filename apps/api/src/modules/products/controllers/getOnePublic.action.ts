import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Product } from '@repo/entities';

import { entities, logs } from '~/utils';

interface Params {
    id: string
};

export default async function getOnePublic(req: Request, res: Response<["params"], Params>) {

    const [product, err] = await entities.findOne<Product>(Product, {
        where: {
            id: res.locals.params.id,
            details: {
                status: "ACTIVE"
            }
        },
        relations: {
            details: true,
            media: true,
            tags: {
                tag: true
            },
            categories: {
                category: true
            }
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding product"
        });
    }

    if(!product) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find product"
        });
    }

    return res.json({ results: product });
};