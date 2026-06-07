import { z } from 'zod';
import { multerFileSchema } from '~/types/validation';

export const updateSchema = z.object({
    name: z.string().optional(),
    state: z.string().optional(),
    file: multerFileSchema.optional()
});