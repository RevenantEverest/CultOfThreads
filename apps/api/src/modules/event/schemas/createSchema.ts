import { z } from 'zod';

export const createSchema = z.object({
    marketId: z.string(),
    address: z.string(),
    dateFrom: z.coerce.date(),
    dateTo: z.coerce.date()
});