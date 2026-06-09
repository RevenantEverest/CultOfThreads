import { z } from 'zod';
import { multerFileSchema } from '~/types/validation';

export const createSchema = z.object({
    marketId: z.string(),
    address: z.string(),
    dateFrom: z.coerce.date(),
    dateTo: z.coerce.date(),
    file: multerFileSchema
});