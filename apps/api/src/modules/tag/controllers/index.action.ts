import type { Request, Response } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { Tag } from '@repo/entities';

import { entities, logs, pagination } from '~/utils';

export default async function index(req: Request, res: Response<["auth", "pagination"]>) {

    const { limit, offset } = res.locals.pagination;

    const [tags, err] = await entities.indexAndCount<Tag>(Tag, {
        limit,
        offset,
        order: {
            name: "ASC"
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error indexing tags"
        });
    }

    if(!tags) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to index tags"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Tag>(req, res, tags);

    return res.json(paginatedResponse);
};