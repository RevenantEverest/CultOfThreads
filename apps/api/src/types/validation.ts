import { z } from 'zod';

/**
 * Reusable Zod schema map using entity keys as an initial param
 * to assign Zod data types
 */
export type ConstrainedZodSchemaMap<AllowedKeys extends string, MappingObject extends Record<AllowedKeys, any>> = MappingObject;

export const multerFileSchema = z.object({
    buffer: z.instanceof(Buffer),
    mimetype: z.string(),
    originalname: z.string(),
    size: z.number()
});

export type MulterFile = z.infer<typeof multerFileSchema>;