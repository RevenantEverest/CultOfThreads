import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Event } from '@repo/entities';
import { updateSchema } from '~/modules/event/schemas';

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

    const [event, err] = await entities.findOne<Event>(Event, {
        where: {
            id: res.locals.params.id
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding event"
        });
    }

    if(!event) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find event"
        });
    }

    const file: Express.Multer.File | undefined = req.file;
    let flyerUrl: string | undefined;

    if(file) {
        if(event.flyerUrl) {
            await supabaseStorage.destroy({
                fullFilePath: event.flyerUrl
            });
        }

        const storageResponse = await supabaseStorage.create({
            rootSubPath: `${SUPABASE_STORAGE.SUB_BUCKETS.EVENTS}`,
            file: file
        });

        flyerUrl = storageResponse;
    }

    const { marketId, address, dateFrom, dateTo } = validatedBody.data;

    const [updatedEvent, updateErr] = await entities.update<Event>(Event, {
        ...event,
        ...(
            marketId && 
            { 
                market: {
                    id: marketId
                } 
            }
        ),
        address: address ?? event.address,
        dateFrom: dateFrom ?? event.dateFrom,
        dateTo: dateTo ?? event.dateTo,
        flyerUrl: flyerUrl ?? event.flyerUrl
    });

    if(updateErr) {
        logs.error({ err: updateErr });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error updating event"
        });
    }

    if(!updatedEvent) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to update event"
        });
    }

    return res.json({ results: updatedEvent });
};