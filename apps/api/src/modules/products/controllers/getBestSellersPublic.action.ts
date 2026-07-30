import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Product } from '@repo/entities';

import { entities, logs } from '~/utils';

export default async function getBestSellersPublic(req: Request, res: Response) {

    const [products, err] = await entities.find<Product>(Product, {
        where: {
            tags: {
                tag: {
                    name: "Best Seller"
                }
            },
            details: {
                status: "ACTIVE"
            }
        },
        order: {
            createdAt: "DESC"
        },
        take: 4,
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
            error: true, message: "Error fetching product best sellers"
        });
    }

    if(!products) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to fetch product best sellers"
        });
    }

    return res.json({ results: products });
};

