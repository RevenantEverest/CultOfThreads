import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import ContactForm from '../contactForm.entity';

import { entities, logs, pagination } from '~/utils';

export default async function index(req: Request, res: Response<["pagination", "auth"]>) {

    const { limit, offset } = res.locals.pagination;

    const [submissions, err] = await entities.indexAndCount<ContactForm>(ContactForm, {
        limit, offset, order: {
            
        }
    });

    if(!submissions) {
        return res.status(StatusCodes.NOT_FOUND).json({ 
            error: true, message: "Unable to index contact form submissions" 
        });
    }

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            error: true, message: "Error indexing contact form submissions" 
        });
    }

    const paginatedResponse = pagination.paginateResponse<ContactForm>(req, res, submissions);

    return res.json({ paginatedResponse });
};