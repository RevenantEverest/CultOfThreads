import { z } from 'zod';

export const addPaymentProcessorSchema = z.object({
    providerTarget: z.union([
        z.literal("STRIPE"),
        z.literal("SQUARE")
    ])
});