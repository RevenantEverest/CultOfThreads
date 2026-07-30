import type { Request, Response, NextFunction, LocalsQueryContext } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import qs from 'qs';

function parseQueryContext<T>(schema: z.ZodType<T>) {
    return (req: Request, res: Response<"queryContext">, next: NextFunction) => {

        if(!req.query && !req.query["query"]) {
            next();
        }
    
        const parsedQuery = qs.parse(req.query.query as string);
        const validatedQuery = schema.safeParse(parsedQuery);

        if(!validatedQuery.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: true,
                message: "Invalid query",
                issues: z.treeifyError(validatedQuery.error)
            });
        }

        res.locals.queryContext = validatedQuery.data as LocalsQueryContext;
        next();
    };
};

export default parseQueryContext;