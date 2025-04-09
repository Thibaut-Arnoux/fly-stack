import { ClassTypeEnumList } from '@/enums/class';
import { localizedStringSchema } from '@/schemas/shared';
import { z } from 'zod';

export const classSchema = z.object({
  id: z.union([z.string(), z.number().int()]).transform((val) => String(val)),
  name: localizedStringSchema,
  type: z.enum(ClassTypeEnumList as [string, ...string[]]),
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
