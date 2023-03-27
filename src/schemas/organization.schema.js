import { z } from 'zod';

export const organizationValidation = z.object({
  short_name: z.string(),
  business_name: z.string(),
  country: z.string(),
});
