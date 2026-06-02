import type { Request, Response, NextFunction } from '~/types/express';

import { number, z } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { common } from '~/utils';

function testKey(key: string): boolean {
    const re: RegExp = new RegExp("({*.+}?)?((Id|_id)$|(^id$))", "gi");
    return re.test(key);
};

async function id(req: Request<unknown, { [key: string]: string }>, res: Response, next: NextFunction) {

    const exclude: string[] = [];

    if(!res.locals.params) {
        res.locals.params = {};
    }

    const handleError = () => {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: true, message: "Invalid ID Parameter" });
    };

    const paramKeys: Array<string> = Object.keys(req.params).map((key: string) => {
        if(!testKey(key) || exclude.includes(key)) return null;
        return key;
    }).filter(common.isTruthy);

    if(paramKeys.length <= 0) {
        return handleError();
    }

    const uuidSchema = z.uuid();
    const numberSchema = z.coerce.number().int();

    for(let i = 0; i < paramKeys.length; i++) {
        const key: string | undefined = paramKeys[i];

        if(!key || !req.params[key]) {
            continue;
        }

        const id: string | number = req.params[key];

        const isUuid = uuidSchema.safeParse(id).success;
        const isNumber = numberSchema.safeParse(id).success;

        if(!isUuid && !isNumber) {
            return handleError();
        }

        res.locals.params[key] = isNumber ? Number(id) : id;
    }

    next();
};

export default id;