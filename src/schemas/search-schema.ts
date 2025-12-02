import { z } from 'zod';

// Raw search parameters schema (as received from URL)
export const searchSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  rarity: z.string().optional(),
  level: z.string().optional(),
  sort: z.string().optional(),
});

export type SearchParams = z.infer<typeof searchSchema>;
