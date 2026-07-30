import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Market } from '@repo/entities';
import { updateSchema } from '~/modules/market/schemas';

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

    const [market, err] = await entities.findOne<Market>(Market, {
        where: {
            id: res.locals.params.id
        },
        relations: {
            details: true
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding market"
        });
    }

    if(!market) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find market"
        });
    }

    const file: Express.Multer.File | undefined = req.file;
    let logoUrl: string | undefined;

    if(file) {
        if(market.details.logoUrl) {
            await supabaseStorage.destroy({
                fullFilePath: market.details.logoUrl
            });
        }

        const storageResponse = await supabaseStorage.create({
            rootSubPath: `${SUPABASE_STORAGE.SUB_BUCKETS.MARKETS}/${market.id}`,
            file
        });

        logoUrl = storageResponse;
    }

    const [updatedMarket, updateErr] = await entities.update<Market>(Market, {
        ...market,
        name: validatedBody.data.name ?? market.name,
        details: {
            ...market.details,
            state: validatedBody.data.state ?? market.details.state,
            logoUrl: logoUrl ?? market.details.logoUrl
        }
    });

    if(updateErr) {
        logs.error({ err: updateErr });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error updating market"
        });
    }

    if(!updatedMarket) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to update market"
        });
    }

    return res.json({ results: updatedMarket });
};