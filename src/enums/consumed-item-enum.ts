export const ConsumedItemEnum = {
  ARROW: 'arrow',
} as const;

export const ConsumedItemEnumList = Object.values(ConsumedItemEnum);

export type ConsumedItem =
  (typeof ConsumedItemEnum)[keyof typeof ConsumedItemEnum];
