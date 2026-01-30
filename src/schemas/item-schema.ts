import z from 'zod';
import { AttackSpeedEnum } from '@/enums/attack-speed-enum';
import { ConsumedItemEnum } from '@/enums/consumed-item-enum';
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
  continent: z.number().int().nullable(),
});

const abilitySchema = z.object({
  parameter: z.string(),
  rate: z.boolean().nullable(),
  add: z.number().nullable(),
  set: z.number().nullable(),
});

export type Ability = z.infer<typeof abilitySchema>;

const triggerSkillSchema = z.object({
  skill: z.number().int(),
  on_target: z.boolean(),
});

export type TriggerSkill = z.infer<typeof triggerSkillSchema>;

const contentSchema = z.object({
  item: z.number().int(),
  count: z.number().int(),
});

export type Content = z.infer<typeof contentSchema>;

const dismantleSchema = z.object({
  count: z.number().int(),
  save_piercing: z.boolean(),
  save_element: z.boolean(),
  save_upgrade: z.boolean(),
  input_upgrade_level: z.number().int().nullable(),
  item: z.number().int().nullable(),
});

export type Dismantle = z.infer<typeof dismantleSchema>;

const possibleRandomStatSchema = z.object({
  parameter: z.string(),
  add: z.number(),
  add_max: z.number(),
  rate: z.boolean(),
});

export type PossibleRandomStat = z.infer<typeof possibleRandomStatSchema>;

const locationSchema = z.object({
  world: z.number().int(),
  x: z.number(),
  y: z.number(),
  z: z.number(),
  continent: z.number().int().nullable(),
});

export type Location = z.infer<typeof locationSchema>;

const upgradeLevelSchema = z.object({
  upgrade_level: z.number().int(),
  required_level: z.number().int(),
  abilities: z.array(abilitySchema),
});

export type UpgradeLevel = z.infer<typeof upgradeLevelSchema>;

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
  min_attack: z.number().int().positive().nullable(),
  max_attack: z.number().int().positive().nullable(),
  attack_speed: z.enum(AttackSpeedEnum).nullable(),
  attack_speed_value: z.number().nullable(),
  attack_range: z.number().int().positive().nullable(),
  two_handed: z.boolean().nullable(),
  additional_skill_damage: z.number().int().positive().nullable(),
  ultimate_convertible: z.boolean().nullable(),
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
  duration: z.number().int().positive().nullable(),
  spawns: z.array(spawnSchema),
  transy: z.number().int().positive().nullable(),
  abilities: z.array(abilitySchema).nullable(),
  trigger_skill: z.array(triggerSkillSchema).nullable(),
  trigger_skill_probability: z.number().int().positive().nullable(),
  consumed_mp: z.number().int().positive().nullable(),
  consumed_item: z.enum(ConsumedItemEnum).nullable(),
  cooldown: z.number().nullable(),
  casting: z.number().nullable(),
  contents: z.array(contentSchema).nullable(),
  dismantle: z.array(dismantleSchema).nullable(),
  possible_random_stats: z.array(possibleRandomStatSchema).nullable(),
  element_attack: z.number().int().positive().nullable(),
  flight_speed: z.number().int().positive().nullable(),
  guild_contribution: z.number().int().positive().nullable(),
  location: locationSchema.nullable(),
  minimum_target_item_level: z.number().int().positive().nullable(),
  blinkwing_target: locationSchema.nullable(),
  couple_bank_slots: z.number().int().positive().nullable(),
  couple_cheers: z.number().int().positive().nullable(),
  couple_teleports: z.number().int().positive().nullable(),
  fishing_large_chance: z.number().int().positive().nullable(),
  gathering_chance: z.number().int().positive().nullable(),
  upgrade_levels: z.array(upgradeLevelSchema).nullable(),
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
