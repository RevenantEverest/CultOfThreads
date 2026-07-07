import { z } from 'zod';

export const updateSchema = z.object({
    marketId: z.string().optional(),
    address: z.string().optional(),
    dateFrom: z.coerce.date().optional(),
    dateTo: z.coerce.date().optional()
});