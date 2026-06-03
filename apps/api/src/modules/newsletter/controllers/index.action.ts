import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Newsletter } from '@repo/entities';

import { entities, logs, pagination } from '~/utils';

async function index(req: Request, res: Response<["pagination", "auth"]>) {
    
    const { limit, offset } = res.locals.pagination;

    const [newsletter, err] = await entities.indexAndCount<Newsletter>(Newsletter, {
        limit, offset, order: {
            createdAt: "DESC"
        },
        relations: {
            contact: true
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error indexing newsletter sign ups"
        });
    }

    if(!newsletter) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to index newsletter sign ups"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Newsletter>(req, res, newsletter);

    return res.json(paginatedResponse);
};

export default index;