import type { Request, Response, NextFunction } from '~/types/express';
import type { AuthPayload } from '~/types/auth';

import { StatusCodes } from 'http-status-codes';
import { jwtVerify, createRemoteJWKSet } from 'jose';

import { ENV } from '~/constants';
import { logs } from '~/utils';

const JWKS_URI = `${ENV.SUPABASE_AUTH_URL}/.well-known/jwks.json`;

const JWKS = createRemoteJWKSet(new URL(JWKS_URI));

export default async function verifyToken(req: Request, res: Response<"auth">, next: NextFunction) {
    try {
        const bearerHeader = req.headers['authorization'];

        if(!bearerHeader) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
        }

        const bearer: string[] = bearerHeader.split(" ");
        const bearerToken: string | undefined = bearer[1];

        if(!bearerToken) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
        }

        const { payload } = await jwtVerify(bearerToken, JWKS, {
            issuer: ENV.SUPABASE_AUTH_URL,
            audience: "authenticated"
        });

        res.locals.auth = {
            iss: payload.iss as AuthPayload["iss"],
            sub: payload.sub as AuthPayload["sub"],
            aud: payload.aud as AuthPayload["aud"],
            exp: payload.exp as AuthPayload["exp"],
            iat: payload.iat as AuthPayload["iat"],
            email: payload.email as AuthPayload["email"],
            phone: payload.phone as AuthPayload["phone"],
            app_metadata: payload.app_metadata as AuthPayload["app_metadata"],
            user_metadata: payload.user_metadata as AuthPayload["user_metadata"],
            role: payload.role as AuthPayload["role"],
            aal: payload.aal as AuthPayload["aal"],
            amr: payload.amr as AuthPayload["amr"],
            session_id: payload.session_id as AuthPayload["session_id"],
            is_anonymous: payload.is_anonymous as AuthPayload["is_anonymous"],
            accessToken: bearerToken
        };
        next();
    }
    catch(err) {
        const error = err as Error;
        logs.error({ err: error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};