import { type ZodSchema, z } from 'zod';

// ids
const idSchema = z.number().int();

export const idsSchema = z.array(idSchema);

// localized string
export const localizedStringSchema = z.object({
  en: z.string(),
  ar: z.string(),
  br: z.string(),
  cns: z.string(),
  de: z.string(),
  fi: z.string(),
  fil: z.string(),
  fr: z.string(),
  id: z.string(),
  it: z.string(),
  jp: z.string(),
  kr: z.string(),
  nl: z.string(),
  pl: z.string(),
  ru: z.string(),
  sp: z.string(),
  sw: z.string(),
  th: z.string(),
  tw: z.string(),
  vi: z.string(),
});

export const localizedStringOptionalSchema = localizedStringSchema
  .partial()
  .extend({
    en: localizedStringSchema.shape.en, // keep "en" required
  });

// paginated
export const paginatedSchema = <T extends ZodSchema>(schema: T) => {
  return z.object({
    first: z.number(),
    prev: z.number().nullable(),
    next: z.number().nullable(),
    last: z.number(),
    pages: z.number(),
    items: z.number(),
    data: z.array(schema),
  });
};
