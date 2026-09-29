import { z } from 'zod';
import { schemaValidation } from '~/utils';

export const updateSchema = z.object({
    productId: z.string().optional(),
    saleType: z.union([
        z.literal("EVENT"),
        z.literal("ONLINE"),
        z.literal("OTHER")
    ]).optional(),
    salePrice: z.coerce.number().optional(),
    purchaseDate: z.iso.datetime({ offset: true }).optional(),
    marketName: z.string().optional(),
    productName: z.string().optional(),
    originalProductPrice: z.coerce.number().optional(),
    notes: z.preprocess((value) => {
        return schemaValidation.parseJsonValue(value);        
    }, z.array(z.record(z.string(), z.any()))).optional(),
    eventId: z.string().optional()
});