import z from 'zod';
import { ElementEnum } from '@/enums/element-enum';
import { ItemCategoryEnum } from '@/enums/item-category-enum';
import { ItemRarityEnum } from '@/enums/item-rarity-enum';
import { ItemSubcategoryEnum } from '@/enums/item-subcategory-enum';
import { SexEnum } from '@/enums/sex-enum';
import type { ItemUser } from '@/schemas/item-user-schema';
import {
  localizedStringSchema,
  timestampSchema,
} from '@/schemas/shared-schema';

const spawnSchema = z.object({
  world: z.number().int(),
  left: z.number().int(),
  top: z.number().int(),
  right: z.number().int(),
  bottom: z.number().int(),
  continent: z.number().int().optional(),
});

export const itemSchema = z.object({
  id: z.uuid(),
  item_id: z.number().int().positive(),
  name: localizedStringSchema,
  description: localizedStringSchema,
  icon: z.string(),
  class: z.number().int().positive().nullable(),
  level: z.number().int().positive(),
  element: z.enum(ElementEnum).nullable(),
  min_defense: z.number().int().positive().nullable(),
  max_defense: z.number().int().positive().nullable(),
  category: z.enum(ItemCategoryEnum),
  subcategory: z.enum(ItemSubcategoryEnum).nullable(),
  rarity: z.enum(ItemRarityEnum),
  sex: z.enum(SexEnum).nullable(),
  stack: z.number().int().positive(),
  buy_price: z.number().int().positive().nullable(),
  sell_price: z.number().int().positive(),
  consumable: z.boolean(),
  premium: z.boolean(),
  shining: z.boolean(),
  tradable: z.boolean(),
  deletable: z.boolean(),
  duration_real_time: z.boolean(),
  spawns: z.array(spawnSchema),
  transy: z.number().int().positive().nullable(),
  ...timestampSchema.shape,
});

export type Item = z.infer<typeof itemSchema>;

export const itemsSchema = z.array(itemSchema);

export type ItemWithUserLinks = Item & {
  item_user_id?: ItemUser['id'];
  favorite: ItemUser['favorite'];
  note: ItemUser['note'];
};

export type ItemColumns = Pick<
  ItemWithUserLinks,
  | 'id'
  | 'icon'
  | 'name'
  | 'description'
  | 'sex'
  | 'rarity'
  | 'category'
  | 'subcategory'
  | 'level'
  | 'favorite'
>;
