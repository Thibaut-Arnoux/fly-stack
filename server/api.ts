import type { ZodArray, ZodSchema, z } from 'zod';
import { classesSchema } from '../src/schemas/class';
import { itemsSchema } from '../src/schemas/item';
import { idsSchema } from '../src/schemas/shared';
import { splitIdsIntoBatches } from './utils';

const fetchIds = async (endpoint: string) => {
  const response = await fetch(process.env.FLYFF_API_BASE_URL + endpoint);
  const data = await response.json();
  const ids = idsSchema.parse(data);

  return ids;
};

const fetchDatas = async <T extends ZodArray<ZodSchema>>(
  endpoint: string,
  schema: T,
): Promise<z.infer<T>> => {
  const ids = await fetchIds(endpoint);
  const batches = splitIdsIntoBatches(ids, 100);
  const datas: z.infer<T> = [];

  for (const batch of batches) {
    const joinedIds = batch.join(',');
    const response = await fetch(
      `${process.env.FLYFF_API_BASE_URL + endpoint}/${joinedIds}`,
    );
    const data = await response.json();
    const parsedData: z.infer<T> = schema.parse(data);

    datas.push(...parsedData);
  }

  return datas;
};

export const fetchItems = async () => {
  return await fetchDatas('/item', itemsSchema);
};

export const fetchClasses = async () => {
  return await fetchDatas('/class', classesSchema);
};
