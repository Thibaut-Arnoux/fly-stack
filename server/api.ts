import ky from 'ky';
import { splitIdsIntoBatches } from './utils.js';
import { idsSchema, itemsSchema } from './schemas.js';
import type { Item } from './types.js';

export const fetchItemData = async () => {
  try {
    // TODO: Add env variable
    const responseIds = await ky.get('https://api.flyff.com/item');
    const dataIds = await responseIds.json();
    const ids = idsSchema.parse(dataIds);
    const batches = splitIdsIntoBatches(ids, 100);

    const allItems: Item[] = [];

    for (const batch of batches) {
      const splittedIds = batch.join(',');
      const responseItems = ky.get(`https://api.flyff.com/item/${splittedIds}`);
      const dataItems = await responseItems.json();
      const items = itemsSchema.parse(dataItems);

      allItems.push(...items);
    }

    return allItems;
  } catch (error) {
    console.error('Error fetching item data:', error);
  }
};
