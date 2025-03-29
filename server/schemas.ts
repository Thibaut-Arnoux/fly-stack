import { z } from 'zod';

// ids
const idSchema = z.number().int();
export const idsSchema = z.array(idSchema);

// items
const localizedStringSchema = z.object({
  en: z.string(),
  ar: z.string().optional(),
  br: z.string().optional(),
  cns: z.string().optional(),
  de: z.string().optional(),
  fi: z.string().optional(),
  fil: z.string().optional(),
  fr: z.string().optional(),
  id: z.string().optional(),
  it: z.string().optional(),
  jp: z.string().optional(),
  kr: z.string().optional(),
  nl: z.string().optional(),
  pl: z.string().optional(),
  ru: z.string().optional(),
  sp: z.string().optional(),
  sw: z.string().optional(),
  th: z.string().optional(),
  tw: z.string().optional(),
  vi: z.string().optional(),
});

const spawnSchema = z.object({
  world: z.number().int(),
  left: z.number().int(),
  top: z.number().int(),
  right: z.number().int(),
  bottom: z.number().int(),
  continent: z.number().int().optional(),
});

export const itemSchema = z.object({
  id: z
    .number()
    .int()
    .transform((val) => String(val)),
  name: localizedStringSchema,
  description: localizedStringSchema,
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

export const itemsSchema = z.array(itemSchema);
