import type { Request, Response } from '~/types/express';
import type { DeepPartial } from 'typeorm';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Product, ProductCategory, ProductTag, ProductMedia } from '@repo/entities';
import { createSchema } from '~/modules/products/schemas';

import { entities, logs, supabaseStorage } from '~/utils';
import { SUPABASE_STORAGE } from '~/constants';

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

    if(validatedBody.data.categories) {
        const categoryIds = validatedBody.data.categories;

        logs.log({ message: `Inserting ${categoryIds.length} categories` });

        for(let i = 0; i < categoryIds.length; i++) {
            const currentId = categoryIds[i];

            if(!currentId) {
                continue;
            }

            try {
                await entities.insert<ProductCategory>(ProductCategory, {
                    product: {
                        id: product.id
                    },
                    category: {
                        id: currentId
                    }
                });
            }
            catch(categoryErr) {
                logs.log({ level: "ERROR", message: `Failed category insert at ${i}/${categoryIds.length}` });
                logs.error({ err: categoryErr as Error });
            }
        }
    }

    if(validatedBody.data.tags) {
        const tagIds = validatedBody.data.tags;

        logs.log({ message: `Inserting ${tagIds.length} tags` });

        for(let i = 0; i < tagIds.length; i++) {
            const currentId = tagIds[i];

            if(!currentId) {
                continue;
            }

            try {
                await entities.insert<ProductTag>(ProductTag, {
                    product: {
                        id: product.id
                    },
                    tag: {
                        id: currentId
                    }
                });
            }
            catch(tagErr) {
                logs.log({ level: "ERROR", message: `Failed tag insert at ${i}/${tagIds.length}` });
                logs.error({ err: tagErr as Error });
            }
        }
    }

    const files = req.files as Express.Multer.File[] | undefined;

    if(files) {
        logs.log({ message: `Uploading ${files.length} files` });
        for(let i = 0; i < files.length; i++) {
            const currentFile = files[i];

            if(!currentFile) {
                continue;
            }
            
            try {
                const storageResponse = await supabaseStorage.create({
                    rootSubPath: `${SUPABASE_STORAGE.SUB_BUCKETS.PRODUCTS}/${product.id}`,
                    file: currentFile
                });

                await entities.insert<ProductMedia>(ProductMedia, {
                    product: {
                        id: product.id
                    },
                    type: currentFile.mimetype,
                    mediaUrl: storageResponse
                });
            }
            catch(fileErr) {
                logs.log({ level: "ERROR", message: `Failed file upload at file ${i}/${files.length}` });
                logs.error({ err: fileErr as Error });
            }
        }
    }

    return res.json({ results: product });
};