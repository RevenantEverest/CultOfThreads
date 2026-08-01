import { z } from 'zod';

export const createSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    message: z.string(),
    website: z.string().optional()
});