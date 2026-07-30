import type { Request, Response } from '~/types/express';
import type { FindOneOptions } from 'typeorm';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Contact } from '@repo/entities';
import { updateSchema } from '~/modules/contact/schemas';

import { entities, logs } from '~/utils';

type Body = z.infer<typeof updateSchema>;
type Params = {
    id: Contact["id"]
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

    const findOptions: FindOneOptions<Contact> = {
        where: {
            id: res.locals.params.id
        }
    };

    const [contact, err] = await entities.findAndUpdate<Contact>(Contact, findOptions, {
        ...validatedBody.data
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error updating contact"
        });
    }

    if(!contact) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to update contact"
        });
    }

    return res.json({ results: contact });
};