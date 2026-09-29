import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { Sale } from '@repo/entities';
import { createSchema } from '~/modules/sales/schemas';
import { entities, logs } from '~/utils';

type Body = z.infer<typeof createSchema>

export default async function create(req: Request<Body>, res: Response<["auth"]>) {

    const validatedBody = await createSchema.safeParseAsync(req.body);
    
    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const {
        productId,
        saleType,
        salePrice,
        purchaseDate,
        productName,
        originalProductPrice,
        notes,
        eventId,
        marketName,
    } = validatedBody.data;

    const [sale, err] = await entities.insert<Sale>(Sale, {
        saleType,
        salePrice,
        purchaseDate,
        productName,
        originalProductPrice,
        ...(productId && { product: { id: productId } }),
        ...(notes && { notes: JSON.stringify(notes) }),
        ...(eventId && { event: { id: eventId } }),
        ...(marketName && { marketName })
    });

    if(err) {
        logs.error({ err, message: "Failed to create sale" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Failed to create sale"
        });
    }

    if(!sale) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to create sale"
        });
    }

    return res.json({ results: sale });
};