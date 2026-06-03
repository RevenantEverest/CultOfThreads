import type { ConstrainedZodSchemaMap } from '~/types/validation';

import { z, ZodLiteral, ZodUnion } from 'zod';
import { ContactForm } from '@repo/entities';

/* Update Schema */
type UpdateContactFormProperties = keyof Pick<ContactForm, (
    "status"
)>;

type UpdateZodSchemaMap = ConstrainedZodSchemaMap<UpdateContactFormProperties, {
    status: ZodUnion<[
        ZodLiteral<ContactForm["status"]>,
        ZodLiteral<ContactForm["status"]>
    ]>
}>;

export const updateSchema = z.object<UpdateZodSchemaMap>({
    status: z.union([
        z.literal("PENDING"),
        z.literal("RESOLVED")
    ])
});