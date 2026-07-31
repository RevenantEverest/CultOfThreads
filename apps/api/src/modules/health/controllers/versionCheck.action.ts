import type { Request, Response } from '~/types/express';

export default async function versionCheck(req: Request, res: Response) {
    return res.json({ 
        commit: process.env.GIT_COMMIT_SHA || "unknown",
        builtAt: process.env.BUILD_TIME || "unknown"
    });
};