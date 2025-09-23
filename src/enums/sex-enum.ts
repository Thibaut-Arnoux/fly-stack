export const SexEnum = {
  FEMALE: 'female',
  MALE: 'male',
} as const;

export const SexEnumList = Object.values(SexEnum);

export type Sex = (typeof SexEnum)[keyof typeof SexEnum];
