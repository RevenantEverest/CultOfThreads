import type { Request, Response } from '~/types/express';
import type { FindOneOptions } from 'typeorm';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Contact, ContactForm } from '@repo/entities';
import { createSchema } from '~/modules/contactForm/schema';

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

    // check honeypot value
    if(validatedBody.data.website && validatedBody.data.website.length > 0) {
        return res.status(StatusCodes.OK);
    }

    const [submission, err] = await entities.insert<ContactForm>(ContactForm, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        message: req.body.message,
        status: "PENDING"
    });

    if(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error creating contact form submission"
        });
    }

    if(!submission) {
        return res.status(StatusCodes.NOT_FOUND).json({ 
            error: true, message: "Unable to create contact form submission" 
        });
    }

    const findOptions: FindOneOptions<Contact> = {
        where: {
            email: submission.email
        }
    };

    const [_, contactErr] = await entities.findOrSave<Contact>(Contact, findOptions, {
        firstName: submission.firstName,
        lastName: submission.lastName,
        email: submission.lastName.toLocaleLowerCase()
    });

    if(contactErr) {
        logs.error({ type: "DB", err: contactErr, message: contactErr.message });
    }

    return res.status(StatusCodes.CREATED).json({ results: submission });
};