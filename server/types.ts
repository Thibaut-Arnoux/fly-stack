import type { z } from 'zod';
import type { classSchema, itemSchema } from './schemas.js';

export type Item = z.infer<typeof itemSchema>;

export type Class = z.infer<typeof classSchema>;
