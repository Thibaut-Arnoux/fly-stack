import z from 'zod';
import { ItemCategoryEnum } from '@/enums/item-category-enum';
import { ItemRarityEnum } from '@/enums/item-rarity-enum';
import { ItemSubcategoryEnum } from '@/enums/item-subcategory-enum';
import { SexEnum } from '@/enums/sex-enum';
import {
  localizedStringOptionalSchema,
  localizedStringSchema,
} from '@/schemas/shared-schema';

const spawnSchema = z.object({
  world: z.number().int(),
  left: z.number().int(),
  top: z.number().int(),
  right: z.number().int(),
  bottom: z.number().int(),
  continent: z.number().int().optional(),
});

// TODO : update schema with missing new properties
export const itemElectricSchema = z.object({
  id: z.uuid(),
  item_id: z.number().int().positive(),
  name: localizedStringSchema,
  description: localizedStringOptionalSchema,
  icon: z.string(),
  level: z.number().int().positive(),
  element: z.string(),
  category: z.enum(ItemCategoryEnum),
  subcategory: z.enum(ItemSubcategoryEnum).optional(),
  rarity: z.enum(ItemRarityEnum),
  sex: z.enum(SexEnum).optional(),
  stack: z.number().int().positive(),
  sell_price: z.number().int().positive(),
  consumable: z.boolean(),
  premium: z.boolean(),
  shining: z.boolean(),
  tradable: z.boolean(),
  deletable: z.boolean(),
  duration_real_time: z.boolean(),
  spawns: z.array(spawnSchema),
});

export type ItemElectric = z.infer<typeof itemElectricSchema>;

export const itemsElectricSchema = z.array(itemElectricSchema);

export type DisplayItemElectric = Pick<
  ItemElectric,
  | 'id'
  | 'icon'
  | 'name'
  | 'description'
  | 'sex'
  | 'rarity'
  | 'category'
  | 'subcategory'
  | 'level'
>;
