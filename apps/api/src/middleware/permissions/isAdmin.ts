import type { Request, Response, NextFunction } from '~/types/express';

import { supabase } from '~/supabaseClient';
import { logs } from '~/utils';
import { StatusCodes } from 'http-status-codes';

interface UserRole {
    role: {
        id: string,
        name: string
    }
};

export default async function isAdmin(req: Request, res: Response<["auth"]>, next: NextFunction) {

    const { data: { user }, error: userErr } = await supabase.auth.getUser(res.locals.auth.accessToken);

    if(!user || userErr) {
        if(userErr) {
            logs.error({ err: userErr });
        }

        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: true, message: "Unauthorized"
        });
    }

    const { data, error: userRolesErr } = await (
        supabase.from("user_roles")
        .select<string, UserRole>(`
            role: role_id (
                id,
                name
            )
        `)
        .eq("user_id", user.id)
    );

    if(!data || userRolesErr) {
        if(userRolesErr) {
            logs.error({ err: userRolesErr });
        }

        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: true, message: "Unauthorized"
        });
    }

    if(data.map((row) => row.role.name).includes("ADMIN")) {
        next();
    }
    else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: true, message: "Unauthorized"
        });
    }
};