import type { ConstrainedZodSchemaMap } from '~/types/validation';

import { z, ZodEmail, type ZodString } from 'zod';
import ContactForm from '../contactForm.entity';

/* Create Schema */
type CreateContactFormProperties = keyof Pick<ContactForm, (
    "firstName" |
    "lastName" |
    "email" |
    "message"
)>;

type CreateZodSchemaMap = ConstrainedZodSchemaMap<CreateContactFormProperties, {
    firstName: ZodString,
    lastName: ZodString,
    email: ZodEmail,
    message: ZodString
}>;

export const createSchema = z.object<CreateZodSchemaMap>({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    message: z.string()
});