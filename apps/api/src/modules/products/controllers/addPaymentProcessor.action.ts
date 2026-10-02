import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Product } from '@repo/entities';
import { addPaymentProcessorSchema } from '~/modules/products/schemas';

import { syncPaymentProviders } from '~/modules/products/helpers';

import { entities, logs } from '~/utils';

type Body = z.infer<typeof addPaymentProcessorSchema>;
type Params = {
    id: string
};

export default async function addPaymentProcessor(req: Request<Body>, res: Response<["auth" | "params"], Params>) {

    const { id: productId } = res.locals.params;
    const validatedBody = await addPaymentProcessorSchema.safeParseAsync(req.body);

    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const [product, findErr] = await entities.findOne<Product>(Product, {
        where: {
            id: productId
        },
        relations: {
            details: true,
            providerDetails: true,
            media: true
        }
    });

    if(findErr) {
        logs.error({ err: findErr });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding product"
        });
    }

    if(!product) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find product"
        });
    }

    try {
        await syncPaymentProviders(product, {
            actionType: "create",
            providerTargets: [validatedBody.data.providerTarget]
        });

        return res.sendStatus(StatusCodes.CREATED);
    }
    catch(err) {
        logs.error({ err: err as Error, message: `Failed to add payment provider to ${product.id}` })
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to add payment provider"
        });
    }
};