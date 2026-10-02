import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { Sale } from '@repo/entities';
import { updateSchema } from '~/modules/sales/schemas';

import { entities, logs } from '~/utils';

interface Params {
    id: string
};

type Body = z.infer<typeof updateSchema>;

export default async function getOne(req: Request<Body>, res: Response<["auth", "params"], Params>) {
    const validatedBody = await updateSchema.safeParseAsync(req.body);
    
    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const [sale, findErr] = await entities.findOne<Sale>(Sale, {
        where: {
            id: res.locals.params.id
        }
    });

    if(findErr) {
        logs.error({ err: findErr, message: "Error finding sale" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding order"
        });
    }

    if(!sale) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find sale"
        });
    }

    const {
        productId,
        saleType,
        salePrice,
        eventId,
        notes,
        purchaseDate,
        marketName,
        productName,
        originalProductPrice
    } = validatedBody.data;

    const [updatedSale, updateErr] = await entities.update<Sale>(Sale, {
        ...sale,
        ...(productId && { product: { id: productId } }),
        ...(eventId && { event: { id: eventId } }),
        saleType: saleType ?? sale.saleType,
        salePrice: salePrice ?? sale.salePrice,
        notes: notes ? JSON.stringify(notes) : sale.notes,
        purchaseDate: purchaseDate ?? sale.purchaseDate,
        marketName: marketName ?? sale.marketName,
        productName: productName ?? sale.productName,
        originalProductPrice: originalProductPrice ?? sale.originalProductPrice
    });

    if(updateErr) {
        logs.error({ err: updateErr, message: "Error updating sale" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error updating sale"
        });
    }

    if(!updatedSale) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to update sale"
        });
    }

    return res.json({ results: updatedSale });
};