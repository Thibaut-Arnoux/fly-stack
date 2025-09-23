export const ClassTypeEnum = {
  BEGINNER: 'beginner',
  EXPERT: 'expert',
  PROFESSIONAL: 'professional',
} as const;

export const ClassTypeEnumList = Object.values(ClassTypeEnum);

export type ClassType = (typeof ClassTypeEnum)[keyof typeof ClassTypeEnum];
