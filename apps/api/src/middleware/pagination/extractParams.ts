import type { Request, Response, NextFunction } from '~/types/express';
import { DEFAULTS } from '~/constants';

function extractParams(req: Request, res: Response<"pagination">, next: NextFunction) {

    const page: number = typeof req.query.page === "string" ? Number(req.query.page) : 1;
    const limit: number = DEFAULTS.PAGINATION.LIMIT;
    const offset: number = limit * (page - 1);

    res.locals.pagination = {
        page, limit, offset
    };

    next();
};

export default extractParams;

