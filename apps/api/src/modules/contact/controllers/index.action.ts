import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Contact } from '@repo/entities';

import { entities, logs, pagination } from '~/utils';

export default async function index(req: Request, res: Response<["pagination", "auth"]>) {

    const { limit, offset } = res.locals.pagination;

    const [contacts, err] = await entities.indexAndCount<Contact>(Contact, {
        limit, offset, order: {
            createdAt: "DESC"
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error indexing contacts"
        });
    }

    if(!contacts) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to index contacts"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Contact>(req, res, contacts);

    return res.json(paginatedResponse);
};