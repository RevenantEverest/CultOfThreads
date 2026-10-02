import { z } from 'zod';

export const querySchema = z.object({
    search: z.string().optional()
});