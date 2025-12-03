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

export const ITEM_FILTER_FIELDS = [
  'name',
  'category',
  'subcategory',
  'rarity',
  'level',
] as const;

export type ItemFilterField = (typeof ITEM_FILTER_FIELDS)[number];

export const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500 text-white border-slate-600',
  uncommon: 'bg-emerald-500 text-white border-emerald-600',
  rare: 'bg-blue-500 text-white border-blue-600',
  epic: 'bg-purple-500 text-white border-purple-600',
  legendary: 'bg-amber-500 text-white border-amber-600',
  unique: 'bg-rose-500 text-white border-rose-600',
} as const;
