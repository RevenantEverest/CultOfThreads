import { z } from 'zod';

export const updateSchema = z.object({
    status: z.union([
        z.literal("PENDING"),
        z.literal("PAID"),
        z.literal("SHIPPED"),
        z.literal("COMPLETE"),
        z.literal("CANCELLED"),
        z.literal("REFUNDED")
    ]),
    customerEmail: z.string().optional(),
    customerName: z.string().optional(),
    billingAddress: z.string().optional(),
    shippingAddress: z.string().optional(),
    trackingNumber: z.string().optional(),
    tokensValidBefore: z.string().optional()
});