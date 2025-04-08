import {
  localizedStringOptionalSchema,
  localizedStringSchema,
  paginatedSchema,
} from '@/schemas/shared';
import { z } from 'zod';

const spawnSchema = z.object({
  world: z.number().int(),
  left: z.number().int(),
  top: z.number().int(),
  right: z.number().int(),
  bottom: z.number().int(),
  continent: z.number().int().optional(),
});

export const itemSchema = z.object({
  id: z.union([z.string(), z.number().int()]).transform((val) => String(val)),
  name: localizedStringSchema,
  description: localizedStringOptionalSchema,
  icon: z.string(),
  level: z.number().int(),
  element: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  rarity: z.string(),
  sex: z.string().optional(),
  stack: z.number().int(),
  sellPrice: z.number().int(),
  consumable: z.boolean(),
  premium: z.boolean(),
  shining: z.boolean(),
  tradable: z.boolean(),
  deletable: z.boolean(),
  durationRealTime: z.boolean(),
  spawns: z.array(spawnSchema),
});

export type Item = z.infer<typeof itemSchema>;

export const itemsSchema = z.array(itemSchema);

export const paginatedItemsSchema = paginatedSchema(itemSchema);

export type PaginatedItems = z.infer<typeof paginatedItemsSchema>;
