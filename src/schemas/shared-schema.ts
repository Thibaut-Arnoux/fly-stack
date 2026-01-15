import { z } from 'zod';

export const localizedStringSchema = z
  .object({
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
  })
  .partial();

export type LocalizedString = z.infer<typeof localizedStringSchema>;

export const txidResponseSchema = z.object({
  txid: z.number().int().positive(),
});

export type TxidResponse = z.infer<typeof txidResponseSchema>;

export const timestampSchema = z.object({
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
});
