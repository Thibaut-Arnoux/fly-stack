export const ItemRarityEnum = {
  COMMON: 'common',
  RARE: 'rare',
  ULTIMATE: 'ultimate',
  UNCOMMON: 'uncommon',
  UNIQUE: 'unique',
  VERYRARE: 'veryrare',
} as const;

export const ItemRarityEnumList = Object.values(ItemRarityEnum);

export type ItemRarity = (typeof ItemRarityEnum)[keyof typeof ItemRarityEnum];
