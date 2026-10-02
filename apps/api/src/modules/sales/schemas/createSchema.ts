import { z } from 'zod';
import { schemaValidation } from '~/utils';

export const createSchema = z.object({
    saleType: z.union([
        z.literal("EVENT"),
        z.literal("ONLINE"),
        z.literal("OTHER")
    ]),
    salePrice: z.coerce.number(),
    purchaseDate: z.iso.datetime({ offset: true }),
    productName: z.string(),
    originalProductPrice: z.coerce.number(),
    productId: z.string().optional(),
    notes: z.preprocess((value) => {
        return schemaValidation.parseJsonValue(value);        
    }, z.array(z.record(z.string(), z.any()))).optional(),
    eventId: z.string().optional(),
    marketName: z.string().optional(),
});