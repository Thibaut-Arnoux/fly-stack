export const AttackSpeedEnum = {
  FAST: 'fast',
  NORMAL: 'normal',
  SLOW: 'slow',
  VERY_FAST: 'veryfast',
  VERY_SLOW: 'veryslow',
} as const;

export const AttackSpeedEnumList = Object.values(AttackSpeedEnum);

export type AttackSpeed =
  (typeof AttackSpeedEnum)[keyof typeof AttackSpeedEnum];
