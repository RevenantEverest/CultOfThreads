import type { Request, Response } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { ContactForm } from '@repo/entities';
import { updateSchema } from '~/modules/contactForm/schema';

import { entities, logs } from '~/utils';

type Body = z.infer<typeof updateSchema>;

export default async function update(req: Request<Body>, res: Response<["auth"]>) {

    const validatedBody = updateSchema.safeParse(req.body);

    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const [submission, err] = await entities.update<ContactForm>(ContactForm, {
        status: req.body.status
    });

    if(!submission) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to update contact form submission"
        })
    }

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error updating contact form submission"
        });
    }

    return res.json({ results: submission });
};