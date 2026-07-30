import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { TrafficAnalytics } from '@repo/entities';
import { createSchema } from '~/modules/trafficAnalytics/schemas';
import { entities, logs } from '~/utils';

type Body = z.infer<typeof createSchema>;

export default async function create(req: Request<Body>, res: Response) {

    const validatedBody = await createSchema.safeParseAsync(req.body);

    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const [trafficAnalytic, err] = await entities.insert<TrafficAnalytics>(TrafficAnalytics, {
        ...validatedBody.data
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error creating traffic analytic"
        });
    }

    if(!trafficAnalytic) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to create traffic analytic"
        });
    }

    return res.sendStatus(StatusCodes.CREATED);
};