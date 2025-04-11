import type { ZodArray, ZodSchema, z } from 'zod';
import { classesSchema } from '../src/schemas/class';
import { type Item, itemsSchema } from '../src/schemas/item';
import { idsSchema } from '../src/schemas/shared';
import { splitIdsIntoBatches, writeBufferToFile } from './utils';

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

export const fetchItemsIcons = async (items: Item[]) => {
  const icons = items.map((item: Item) => item.icon).filter(Boolean);

  const uniqueIcons = Array.from(new Set(icons));

  for (const icon of uniqueIcons) {
    const res = await fetch(
      `${process.env.FLYFF_API_BASE_URL}/image/item/${icon}`,
    );

    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      writeBufferToFile(`${process.env.ICONS_FOLDER}/items/${icon}`, buffer);
    } else {
      console.log('Failed to fetch icon', icon);
    }
  }
};
export const fetchItems = async () => {
  console.log('Fetching items...');
  const items: Item[] = await fetchDatas('/item', itemsSchema);

  console.log('Fetching items icons...');
  await fetchItemsIcons(items);

  return items;
};

export const fetchClasses = async () => {
  console.log('Fetching classes...');
  return await fetchDatas('/class', classesSchema);
};
