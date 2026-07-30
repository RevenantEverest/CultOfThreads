import type { Request, Response, NextFunction } from '~/types/express';

import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { Newsletter } from '@repo/entities';
import { Contact } from '@repo/entities';

import * as contactSchemas from '~/modules/contact/schemas';
import { entities, logs } from '~/utils';
import { FindOneOptions } from 'typeorm';

type Body = z.infer<typeof contactSchemas["createSchema"]>

async function create(req: Request<Body>, res: Response, next: NextFunction) {
    
    const validatedBody = await contactSchemas.createSchema.safeParseAsync(req.body);

    if(!validatedBody.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "Invalid Body",
            issues: z.treeifyError(validatedBody.error)
        });
    }

    const findOptions: FindOneOptions<Contact> = {
        where: {
            email: req.body.email
        }
    };
    
    const [contact, err] = await entities.findAndSaveOrUpdate<Contact>(Contact, findOptions, {
        firstName: req.body.firstName,
        email: req.body.email.toLocaleLowerCase()
    });

    if(!contact || err) {
        if(err) {
            logs.error({ type: "DB", err, message: err?.message });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Unable to create Contact for Newsletter signup"
        });
    }

    const [newsletter, newsletterErr] = await entities.insert<Newsletter>(Newsletter, {
        contact: {
            id: contact.id
        }
    });

    if(newsletterErr) {
        if(entities.isDuplicateKeyError(newsletterErr)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "You are already signed up for the Newsletter." });
        }

        logs.error({ type: "DB", err: newsletterErr, message: newsletterErr.message });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Unable to create Newsletter signup"
        });
    }

    if(!newsletter) {
        return res.status(StatusCodes.NOT_FOUND).json({ 
            error: true, message: "Unable to create Newsletter signup" 
        });
    }

    return res.sendStatus(StatusCodes.CREATED);
};

export default create;