import z from "zod";
import {
  localizedStringOptionalSchema,
  localizedStringSchema,
} from '@/schemas/shared';

const spawnSchema = z.object({
  world: z.number().int(),
  left: z.number().int(),
  top: z.number().int(),
  right: z.number().int(),
  bottom: z.number().int(),
  continent: z.number().int().optional(),
});

// TODO : update schema with snake case and new properties
export const itemElectricSchema = z.object({
  id: z.string().uuid(),
  item_id: z.number().int().positive(),
  name: localizedStringSchema,
  description: localizedStringOptionalSchema,
  icon: z.string(),
  level: z.number().int().positive(),
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

export type ItemElectric = z.infer<typeof itemElectricSchema>;

export const itemsElectricSchema = z.array(itemElectricSchema);
