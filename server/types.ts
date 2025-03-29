import type { z } from 'zod';
import type { itemSchema } from './schemas.js';

export type Item = z.infer<typeof itemSchema>;
