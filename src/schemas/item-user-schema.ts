import z from 'zod';
import { timestampSchema } from '@/schemas/shared-schema';

export const itemUserSchema = z.object({
  id: z.uuid(),
  item_id: z.uuid(),
  favorite: z.boolean(),
  note: z.string().nullable(),
  ...timestampSchema.shape,
});

export type ItemUser = z.infer<typeof itemUserSchema>;
