import { z } from 'zod';

export const cartProductsSchema = z.object({
    productIds: z.array(z.uuid())
});