import { z } from 'zod';

export const createSchema = z.object({
    landingPageUrl: z.string(),
    utmSource: z.string(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
    utmTerm: z.string().optional(),
    utmContent: z.string().optional()
});