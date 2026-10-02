import type { Request, Response } from '~/types/express';
import type { SyncPaymentProviderOptions } from '~/modules/products/helpers/syncPaymentProviders';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Product, ProductCategory, ProductTag } from '@repo/entities';
import { updateSchema } from '~/modules/products/schemas';

import { entities, logs } from '~/utils';
import { destroyProductMedia, insertRelations, syncPaymentProviders, uploadProductMedia } from '~/modules/products/helpers';

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
            },
            providerDetails: true
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
    const uploadedMedia = await uploadProductMedia(product.id, files);

    const validatedBodyIds = validatedBody.data.media.map((item) => {
        return item.id;
    });

    const removedMedia = await destroyProductMedia(
        updatedProduct.media.filter((item) => !validatedBodyIds.includes(item.id))
    );
    const removedMediaIds = removedMedia.map((item) => item.id);

    updatedProduct.media = [
        ...product.media.filter((media) => !removedMediaIds.includes(media.id)),
        ...uploadedMedia
    ];

    const providerTargets: SyncPaymentProviderOptions["providerTargets"] = [];

    if(updatedProduct?.providerDetails && updatedProduct.providerDetails.stripeProductId) {
        providerTargets.push("STRIPE");
    }

    if(updatedProduct?.providerDetails && updatedProduct.providerDetails.squareProductId) {
        providerTargets.push("SQUARE");
    }

    await syncPaymentProviders(updatedProduct, {
        actionType: "update",
        hasOnlinePriceChange: product.details.onlinePrice !== updatedProduct.details.onlinePrice,
        hasMarketPriceChange: product.details.marketPrice !== updatedProduct.details.marketPrice,
        providerTargets
    });

    return res.json({ results: updatedProduct });
};