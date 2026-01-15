export const ElementEnum = {
  EARTH: 'earth',
  ELECTRICITY: 'electricity',
  FIRE: 'fire',
  WATER: 'water',
  WIND: 'wind',
} as const;

export const ElementEnumList = Object.values(ElementEnum);

export type Element = (typeof ElementEnum)[keyof typeof ElementEnum];
