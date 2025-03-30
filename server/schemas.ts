import { z } from 'zod';

// ids
const idSchema = z.number().int();
export const idsSchema = z.array(idSchema);

const localizedStringSchema = z.object({
  en: z.string(),
  ar: z.string(),
  br: z.string(),
  cns: z.string(),
  de: z.string(),
  fi: z.string(),
  fil: z.string(),
  fr: z.string(),
  id: z.string(),
  it: z.string(),
  jp: z.string(),
  kr: z.string(),
  nl: z.string(),
  pl: z.string(),
  ru: z.string(),
  sp: z.string(),
  sw: z.string(),
  th: z.string(),
  tw: z.string(),
  vi: z.string(),
});

const localizedStringOptionalSchema = localizedStringSchema.partial().extend({
  en: localizedStringSchema.shape.en, // keep "en" required
});

// items
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

export const itemsSchema = z.array(itemSchema);

// class
export const classSchema = z.object({
  id: z
    .number()
    .int()
    .transform((val) => String(val)),
  name: localizedStringSchema,
  type: z.string(),
  tree: z.string(),
  icon: z.string(),
  minLevel: z.number(),
  maxLevel: z.number(),
  hp: z.number(),
  maxHP: z.string(),
  fp: z.number(),
  maxFP: z.string(),
  mp: z.number(),
  maxMP: z.string(),
  attackSpeed: z.number(),
  block: z.number(),
  critical: z.number(),
  autoAttackFactors: z.object({
    sword: z.number(),
    axe: z.number(),
    staff: z.number(),
    stick: z.number(),
    knuckle: z.number(),
    yoyo: z.number(),
    bow: z.number(),
    wand: z.number(),
  }),
});

export const classesSchema = z.array(classSchema);
