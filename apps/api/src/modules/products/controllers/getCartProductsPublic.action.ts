import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Product } from '@repo/entities';
import { cartProductsSchema } from '~/modules/products/schemas';

import { entities, logs } from '~/utils';
import z from 'zod';
import { Any } from 'typeorm';

type Body = z.infer<typeof cartProductsSchema>;

export default async function getCartProductsPublic(req: Request<Body>, res: Response) {

    const validatedBody = await cartProductsSchema.safeParseAsync(req.body);

    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const [products, err] = await entities.find<Product>(Product, {
        select: {
            id: true,
            name: true,
            details: {
                onlinePrice: true
            },
            media: {
                type: true,
                mediaUrl: true
            }
        },
        where: {
            id: Any(validatedBody.data.productIds),
            details: {
                status: "ACTIVE"
            }
        },
        relations: {
            media: true,
            details: true
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error fetching cart products"
        });
    }

    if(!products) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to fetch cart products"
        });
    }

    return res.json({ results: products });
};