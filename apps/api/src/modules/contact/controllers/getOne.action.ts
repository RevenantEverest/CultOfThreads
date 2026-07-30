import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Contact } from '@repo/entities';

import { entities, logs } from '~/utils';

interface Params {
    id: string
};

export default async function getOne(req: Request, res: Response<["auth", "params"], Params>) {

    const [contact, err] = await entities.findOne<Contact>(Contact, {
        where: {
            id: res.locals.params.id
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error finding contact"
        });
    }
    
    if(!contact) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to find contact"
        });
    }

    return res.json({ results: contact });
};