import type { Request, Response, NextFunction } from '~/types/express';

import { StatusCodes } from 'http-status-codes';
import { ENV, ORIGINS } from '~/constants';
import { logs } from '~/utils';

function extractOrigin(value?: string | null): string | null {
    if (!value) return null;
    try {
        const url = new URL(value);
        return `${url.protocol}//${url.host}`;
    } catch {
        return null;
    }
};

export default async function isValidRequestUrl(req: Request, res: Response, next: NextFunction) {
    const origin = extractOrigin(req.get('Origin'));
    const referer = extractOrigin(req.get('Referer'));
    const internalSecret = req.get('x-internal-secret');

    // Allow origin check bypass with access secret key
    if(internalSecret && internalSecret === ENV.API_INTERNAL_ACCESS_SECRET) {
        return next();
    }

    if (!origin && !referer) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: true, message: 'Unauthorized: Missing Origin or Referer Header' });
    }

    const isAllowed = ORIGINS.ALLOWED_ORIGINS.some(allowed => {
        return origin === allowed || referer === allowed;
    });

    if (!isAllowed) {
        logs.log({
            type: 'HTTP',
            level: 'WARNING',
            message: `${origin || referer} doesn't exist in Allowed Origins`
        });
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: true, message: 'Unauthorized' });
    }

    logs.log({ type: "HTTP", level: "SUCCESS", message: `${origin || referer} IS allowed!` });
    next();
};