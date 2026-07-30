import { z } from 'zod';

export const updateSchema = z.object({
    name: z.string().optional(),
    state: z.string().optional()
});