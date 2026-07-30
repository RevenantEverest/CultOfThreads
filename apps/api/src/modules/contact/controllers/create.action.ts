import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Contact } from '@repo/entities';
import { createSchema } from '~/modules/contact/schemas';

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

    const [contact, err] = await entities.insert<Contact>(Contact, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    });

    if(err) {
        if(entities.isDuplicateKeyError(err)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Contact already exists" });
        }

        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Unable to create contact"
        });
    }

    if(!contact) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to create contact"
        });
    }

    return res.sendStatus(StatusCodes.CREATED);
};