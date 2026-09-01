import { z } from 'zod';

const checkoutProductSchema = z.object({
    productId: z.uuid(),
    quantity: z.number()
});

export const createCheckoutSchema = z.object({
    items: z.array(checkoutProductSchema)
});