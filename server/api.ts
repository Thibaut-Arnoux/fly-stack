import ky from 'ky';
import { splitIdsIntoBatches } from './utils.js';
import { classesSchema, idsSchema, itemsSchema } from './schemas.js';
import type { Class, Item } from './types.js';
import type { ZodSchema } from 'zod';

const fetchIds = async (endpoint: string) => {
  const response = await ky.get(process.env.FLYFF_API_BASE_URL + endpoint);
  const data = await response.json();
  const ids = idsSchema.parse(data);

  return ids;
};

const fetchDatas = async <T>(
  endpoint: string,
  schema: ZodSchema,
): Promise<T[]> => {
  const ids = await fetchIds(endpoint);
  const batches = splitIdsIntoBatches(ids, 100);
  const datas: T[] = [];

  for (const batch of batches) {
    const joinedIds = batch.join(',');
    const response = ky.get(
      `${process.env.FLYFF_API_BASE_URL + endpoint}/${joinedIds}`,
    );
    const data = await response.json();
    const parsedData = schema.parse(data);

    datas.push(...parsedData);
  }

  return datas;
};

export const fetchItems = async () => {
  return await fetchDatas<Item>('/item', itemsSchema);
};

export const fetchClasses = async () => {
  return await fetchDatas<Class>('/class', classesSchema);
};
