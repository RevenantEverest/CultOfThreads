import type { Request, Response, NextFunction } from '~/types/express';

import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { ENV } from '~/constants';

export default function verifyOrderToken(req: Request, res: Response, next: NextFunction) {

    try {
        const bearerHeader = req.headers["authorization"];

        if(!bearerHeader) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
        }

        const bearer: string[] = bearerHeader.split(" ");
        const bearerToken: string | undefined = bearer[1];

        if(!bearerToken) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
        }

        const payload = jwt.verify(bearerToken, ENV.ORDER_TOKEN_SECRET);
        
        res.locals.orderAuth = payload;
        next();
    }
    catch(err) {
        if(err instanceof jwt.TokenExpiredError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token has expired" });
        }

        if(err instanceof jwt.JsonWebTokenError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};