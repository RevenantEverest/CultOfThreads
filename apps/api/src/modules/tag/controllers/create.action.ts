import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Tag } from '@repo/entities';
import { createSchema } from '~/modules/tag/schemas';

import { entities, logs } from '~/utils';

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

    const [tag, err] = await entities.insert<Tag>(Tag, {
        name: validatedBody.data.name
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error creating tag"
        });
    }

    if(!tag) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to create tag"
        });
    }

    return res.json({ results: tag });
};