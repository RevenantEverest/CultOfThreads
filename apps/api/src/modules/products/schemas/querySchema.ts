import { z } from 'zod';

const sortSchema = z.string().transform((value, ctx) => {
    const [field, order] = value.split(":");

    if(!field || !order) {
        ctx.addIssue({
            code: "custom",
            message: "Sort must be in format 'field:order'"
        });

        return z.NEVER;
    }

    const allowedFields = ["price", "new", "best sellers"];
    const allowedOrders = ["ASC", "DESC"];

    if(!allowedFields.includes(field) || !allowedOrders.includes(order.toUpperCase())) {
        ctx.addIssue({
            code: "custom",
            message: "Invalid sort field or order"
        });
        return z.NEVER;
    }

    return {
        field, 
        order: order.toUpperCase() as "ASC" | "DESC"
    };
});

export const querySchema = z.object({
    filter: z.object({
        category: z.string().optional(),
        tags: z.preprocess((value) => {
            if(typeof value === "string") {
                return value.split(",");
            }

            return value;
        }, z.array(z.string()).optional()),
    }).optional(),
    sort: sortSchema.optional(),
    search: z.string().optional()
});