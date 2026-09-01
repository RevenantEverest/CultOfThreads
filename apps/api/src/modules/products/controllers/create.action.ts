import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Product, ProductCategory, ProductTag } from '@repo/entities';
import { createSchema } from '~/modules/products/schemas';

import { insertRelations, uploadProductMedia } from '~/modules/products/helpers';

import { entities, logs } from '~/utils';

type Body = z.infer<typeof createSchema>;

export default async function create(req: Request<Body>, res: Response) {

    const validatedBody = await createSchema.safeParseAsync(req.body);

    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const {
        name,
        description,
        marketPrice,
        onlinePrice,
        weightGrams,
        status,
        etsyListing
    } = validatedBody.data;

    const [product, err] = await entities.insert<Product>(Product, {
        name,
        description: JSON.stringify(description) ?? null,
        details: {
            marketPrice,
            onlinePrice,
            weightGrams,
            status,
            etsyListing
        },
        providerDetails: {
            stripeProductId: null,
            stripePriceId: null,
            squareProductId: null
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error creating product"
        });
    }

    if(!product) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to create product"
        });
    }

    await Promise.all([
        insertRelations({ 
            targetEntity: ProductCategory, 
            productId: product.id, 
            relationKey: "category", 
            ids: validatedBody.data.categories
        }),
        insertRelations({
            targetEntity: ProductTag,
            productId: product.id,
            relationKey: "tag",
            ids: validatedBody.data.tags
        })
    ]);

    const files = req.files as Express.Multer.File[] | undefined;
    await uploadProductMedia(product.id, files);

    return res.json({ results: product });
};