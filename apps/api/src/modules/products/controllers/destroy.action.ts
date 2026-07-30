import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Product } from '@repo/entities';

import { entities, logs, supabaseStorage } from '~/utils';

interface Params {
    id: string
};

export default async function destroy(req: Request, res: Response<["auth", "params"], Params>) {

    const [product, err] = await entities.findOne<Product>(Product, {
        where: {
            id: res.locals.params.id
        },
        relations: {
            media: true
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

    if(product.media.length > 0) {
        logs.log({ message: `Deleting ${product.media.length} files` });
        for(let i = 0; i < product.media.length; i++) {
            const currentMedia = product.media[i];

            if(!currentMedia) {
                continue;
            }

            await supabaseStorage.destroy({
                fullFilePath: currentMedia.mediaUrl
            });
        }
    }

    const [deletedEntity, deleteErr] = await entities.destroy<Product>(Product, product);

    if(deleteErr) {
        logs.error({ err: deleteErr });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error deleting product"
        });
    }

    if(!deletedEntity) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to delete product"
        });
    }

    return res.json({ results: deletedEntity });
};