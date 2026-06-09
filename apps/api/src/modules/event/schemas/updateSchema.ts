import { z } from 'zod';
import { multerFileSchema } from '~/types/validation';

export const updateSchema = z.object({
    marketId: z.string().optional(),
    address: z.string().optional(),
    dateFrom: z.coerce.date().optional(),
    dateTo: z.coerce.date().optional(),
    file: multerFileSchema.optional()
});