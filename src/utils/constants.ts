export const ITEM_CONSTANTS = {
  LEVEL: {
    MIN: 1,
    MAX: 165,
  },
} as const;

export const ITEM_SORT_FIELDS = [
  'name',
  'description',
  'sex',
  'category',
  'subcategory',
  'rarity',
  'level',
] as const;

export type ItemSortField = (typeof ITEM_SORT_FIELDS)[number];
