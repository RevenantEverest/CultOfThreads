import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Category } from '@repo/entities';
import { updateSchema } from '~/modules/category/schemas';

import { entities, logs } from '~/utils';

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

    const [category, err] = await entities.findOne<Category>(Category, {
        where: {
            id: res.locals.params.id
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding category"
        });
    }

    if(!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find category"
        });
    }

    const [updatedCategory, updateErr] = await entities.update<Category>(Category, {
        ...category,
        name: validatedBody.data.name
    });

    if(updateErr) {
        logs.error({ err: updateErr });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error updating category"
        });
    }

    if(!updatedCategory) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to update category"
        });
    }

    return res.json({ results: updatedCategory });
};