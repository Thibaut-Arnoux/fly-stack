import z from 'zod';

export const itemUserSchema = z.object({
  id: z.uuid(),
  item_id: z.uuid(),
  favorite: z.boolean(),
  note: z.string().nullable(),
});

export type ItemUser = z.infer<typeof itemUserSchema>;
