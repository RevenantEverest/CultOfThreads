import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Event } from '@repo/entities';
import { createSchema } from '~/modules/event/schemas';

import { entities, logs, supabaseStorage } from '~/utils';
import { SUPABASE_STORAGE } from '~/constants';

type Body = z.infer<typeof createSchema>;

export default async function create(req: Request<Body>, res: Response<["auth"]>) {

    const validatedBody = await createSchema.safeParseAsync(req.body);

    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const file: Express.Multer.File | undefined = req.file;

    if(!file) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true, message: "Missing Image File"
        });
    }

    let flyerUrl: string | undefined;

    if(file) {
        const storageResponse = await supabaseStorage.create({
            rootSubPath: `${SUPABASE_STORAGE.SUB_BUCKETS.EVENTS}`,
            file
        });

        flyerUrl = storageResponse;
    }

    const [event, err] = await entities.insert<Event>(Event, {
        market: {
            id: validatedBody.data.marketId
        },
        address: validatedBody.data.address,
        dateFrom: validatedBody.data.dateFrom,
        dateTo: validatedBody.data.dateTo,
        ...(flyerUrl && { flyerUrl })
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error creating event"
        });
    }

    if(!event) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to create event"
        });
    }

    return res.json({ results: event });
};