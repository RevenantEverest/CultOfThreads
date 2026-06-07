import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Market, MarketDetails } from '@repo/entities';
import { createSchema } from '~/modules/market/schemas';

import { entities, logs, supabaseStorage } from '~/utils';
import { SUPABASE_STORAGE } from '~/constants';

type Body = z.infer<typeof createSchema>;

export default async function create(req: Request<Body>, res: Response) {

    const body: Body = {
        ...req.body,
        file: req.file
    };
    const validatedBody = await createSchema.safeParseAsync(body);

    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const [market, err] = await entities.insert<Market>(Market, {
        name: validatedBody.data.name
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error creating market"
        });
    }

    if(!market) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to create market"
        });
    }

    let logoUrl: string | undefined;

    if(validatedBody.data.file) {
        const storageResponse = await supabaseStorage.create({
            rootSubPath: `${SUPABASE_STORAGE.SUB_BUCKETS.MARKETS}/${market.id}`,
            file: validatedBody.data.file
        });

        logoUrl = storageResponse;
    }

    const [marketDetails, detailsErr] = await entities.insert<MarketDetails>(MarketDetails, {
        market: {
            id: market.id
        },
        state: validatedBody.data.state,
        ...(logoUrl && { logoUrl })
    });

    if(detailsErr) {
        logs.error({ err: detailsErr });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error creating market details"
        });
    }

    if(!marketDetails) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to create market details"
        });
    }

    return res.json({ results: marketDetails });
};