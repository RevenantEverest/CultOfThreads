import type { ConstrainedZodSchemaMap } from '~/types/validation';

import { z, ZodEmail, ZodString, ZodOptional } from 'zod';
import Contact from '../contact.entity';

type RequiredProperties = keyof Pick<Contact, (
    "firstName" |
    "email"
)>;

type OptionalProperties = keyof Partial<Pick<Contact, (
    "lastName" |
    "address" |
    "phone"
)>>;

type ContactProperties = RequiredProperties & OptionalProperties;

type SchemaMap = ConstrainedZodSchemaMap<ContactProperties, {
    firstName: ZodString,
    email: ZodEmail,
    lastName: ZodOptional<ZodString>,
    address: ZodOptional<ZodString>,
    phone: ZodOptional<ZodString>
}>;

export const createSchema = z.object<SchemaMap>({
    firstName: z.string(),
    email: z.email(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional()
});