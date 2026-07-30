import type { ConstrainedZodSchemaMap } from '~/types/validation';

import { z, ZodEmail, ZodLiteral, ZodOptional, ZodString, ZodUnion, ZodUUID } from 'zod';
import { Contact } from '@repo/entities';

type Properties = keyof Pick<Contact, (
    "firstName" |
    "lastName" |
    "email" |
    "phone" |
    "address"
)>;

type ZodSchemaMap = ConstrainedZodSchemaMap<Properties, {
    firstName: ZodOptional<ZodString>,
    lastName: ZodOptional<ZodString>,
    email: ZodOptional<ZodEmail>,
    phone: ZodOptional<ZodString>,
    address: ZodOptional<ZodString>
}>;

export const updateSchema = z.object<ZodSchemaMap>({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.email().optional(),
    phone: z.string().optional(),
    address: z.string().optional()
});