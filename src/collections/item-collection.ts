import { electricCollectionOptions } from '@tanstack/electric-db-collection';
import { createCollection } from '@tanstack/react-db';
import { flyffService } from '@/api/flyff-service';
import { itemSchema } from '@/schemas/item-schema';

export const itemCollection = createCollection(
  electricCollectionOptions({
    id: 'items',
    shapeOptions: {
      url: flyffService.urls.items,
      fetchClient: flyffService.httpClient.asFetch,
    },
    schema: itemSchema,
    getKey: (item) => item.id,
  }),
);
