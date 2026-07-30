import { z } from 'zod';
import { schemaValidation } from '~/utils';

export const createSchema = z.object({
    name: z.string(),
    description: z.preprocess((value) => {
        return schemaValidation.parseJsonValue(value);        
    }, z.array(z.record(z.string(), z.any()))).optional(),
    marketPrice: z.coerce.number().optional(),
    onlinePrice: z.coerce.number().optional(),
    weightGrams: z.coerce.number().optional(),
    status: z.union([
        z.literal("ACTIVE"),
        z.literal("DRAFT")
    ]),
    tags: z.preprocess((value) => {
        return schemaValidation.parseJsonValue(value);
    }, z.array(z.string())),
    categories: z.preprocess((value) => {
        return schemaValidation.parseJsonValue(value);
    }, z.array(z.string())),
    etsyListing: z.url().optional()
});

