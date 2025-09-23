export const ItemCategoryEnum = {
  ARMOR: 'armor',
  ARROW: 'arrow',
  BLINKWING: 'blinkwing',
  BOOTY: 'booty',
  BUFF: 'buff',
  CHARM: 'charm',
  COLLECTOR: 'collector',
  CURRENCY: 'currency',
  FASHION: 'fashion',
  FIREWORK: 'firework',
  FLYING: 'flying',
  FUEL: 'fuel',
  JEWELRY: 'jewelry',
  LIFESTYLE: 'lifestyle',
  MATERIAL: 'material',
  MONSTERBALL: 'monsterball',
  PACK: 'pack',
  PICKUPPET: 'pickuppet',
  QUEST: 'quest',
  RAISEDPET: 'raisedpet',
  RECOVERY: 'recovery',
  SCROLL: 'scroll',
  STORAGE: 'storage',
  TELEPORTRING: 'teleportring',
  TRANS: 'trans',
  VENDORSKIN: 'vendorskin',
  WEAPON: 'weapon',
} as const;

export const ItemCategoryEnumList = Object.values(ItemCategoryEnum);

export type ItemCategory =
  (typeof ItemCategoryEnum)[keyof typeof ItemCategoryEnum];
