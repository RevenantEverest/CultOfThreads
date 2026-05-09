/**
 * Reusable Zod schema map using entity keys as an initial param
 * to assign Zod data types
 */
export type ConstrainedZodSchemaMap<AllowedKeys extends string, MappingObject extends Record<AllowedKeys, any>> = MappingObject;