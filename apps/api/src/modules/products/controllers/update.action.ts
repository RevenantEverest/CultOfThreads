import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Product, ProductCategory, ProductMedia, ProductTag } from '@repo/entities';
import { updateSchema } from '~/modules/products/schemas';

import { entities, logs, supabaseStorage } from '~/utils';
import { SUPABASE_STORAGE } from '~/constants';

type Body = z.infer<typeof updateSchema>;
type Params = {
    id: string
};

export default async function update(req: Request<Body>, res: Response<["auth", "params"], Params>) {

    const validatedBody = await updateSchema.safeParseAsync(req.body);

    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const [product, err] = await entities.findOne<Product>(Product, {
        where: {
            id: res.locals.params.id
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
        })
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

    const [updatedProduct, updateErr] = await entities.update<Product>(Product, {
        ...product,
        name: name ?? product.name,
        description: JSON.stringify(description) ?? description,
        details: {
            id: product.details.id,
            marketPrice: marketPrice ?? product.details.marketPrice,
            onlinePrice: onlinePrice ?? product.details.onlinePrice,
            weightGrams: weightGrams ?? product.details.weightGrams,
            status: status ?? product.details.status,
            etsyListing: etsyListing ?? product.details.etsyListing,
        }
    });

    if(updateErr) {
        logs.error({ err: updateErr });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error updating product"
        });
    }

    if(!updatedProduct) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to update product"
        });
    }

    if(validatedBody.data.categories) {
        const incomingIds = validatedBody.data.categories;
        const existingIds = product.categories.map((item) => item.category.id);

        const idsToAdd = incomingIds.filter(id => !existingIds.includes(id));
        const idsToRemove = existingIds.filter(id => !incomingIds.includes(id));

        await Promise.all([
            ...idsToAdd.map(async (id) => {
                try {
                    await entities.insert<ProductCategory>(ProductCategory, {
                        product: { id: product.id },
                        category: { id }
                    });
                } catch (err) {
                    logs.error({ err: err as Error });
                }
            }),
            ...idsToRemove.map(async (id) => {
                try {
                    const productCategory = product.categories.filter((item) => item.category.id === id)[0];

                    if(!productCategory) {
                        throw new Error("No Product Category");
                    }

                    await entities.destroy<ProductCategory>(ProductCategory, productCategory);
                } catch (err) {
                    logs.error({ err: err as Error });
                }
            })
        ]);
    }

    if(validatedBody.data.tags) {
        const incomingIds = validatedBody.data.tags;
        const existingIds = product.tags.map((item) => item.tag.id);

        const idsToAdd = incomingIds.filter(id => !existingIds.includes(id));
        const idsToRemove = existingIds.filter(id => !incomingIds.includes(id));

        await Promise.all([
            ...idsToAdd.map(async (id) => {
                try {
                    await entities.insert<ProductTag>(ProductTag, {
                        product: { id: product.id },
                        tag: { id }
                    });
                } catch (err) {
                    logs.error({ err: err as Error });
                }
            }),
            ...idsToRemove.map(async (id) => {
                try {
                    const productTag = product.tags.filter((item) => item.tag.id === id)[0];

                    if(!productTag) {
                        throw new Error("No Product Tag");
                    }
                    await entities.destroy<ProductTag>(ProductTag, productTag);
                } catch (err) {
                    logs.error({ err: err as Error });
                }
            })
        ]);
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

    if(validatedBody.data.media) {
        const productMedia = product.media;

        const validatedBodyIds = validatedBody.data.media.map((item) => {
            return item.id;
        });

        logs.log({ message: `Deleting ${validatedBodyIds.length} files` });
        for(let i = 0; i < productMedia.length; i++) {
            const currentMedia = productMedia[i];
            if(currentMedia && !validatedBodyIds.includes(currentMedia.id)) {
                try {
                    await supabaseStorage.destroy({
                        fullFilePath: currentMedia.mediaUrl
                    });
                    await entities.destroy<ProductMedia>(ProductMedia, currentMedia);
                }
                catch(deleteErr) {
                    logs.error({ err: deleteErr as Error });
                }
            }
        }
    }

    return res.json({ results: updatedProduct });
};