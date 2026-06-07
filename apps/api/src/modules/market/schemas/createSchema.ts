import { z } from 'zod';
import { multerFileSchema } from '~/types/validation';

export const createSchema = z.object({
    name: z.string(),
    state: z.string(),
    file: multerFileSchema.optional()
});

