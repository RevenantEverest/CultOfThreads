import type { Request, Response, NextFunction } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { ORIGINS } from '~/constants';

export default async function isValidRequestUrl(req: Request, res: Response, next: NextFunction) {

    const origin = req.get('Origin');
    const referer = req.get('Referer');

    const isAllowed = ORIGINS.ALLOWED_ORIGINS.some(url => {
        return (origin && origin.startsWith(url)) || (referer && referer.startsWith(url));
    });

    if(!isAllowed) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: true, message: StatusCodes.UNAUTHORIZED.toString()
        })
    }

    next();
};