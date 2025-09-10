import { electricCollectionOptions } from '@tanstack/electric-db-collection';
import { createCollection } from '@tanstack/react-db';
import { flyffElectricService } from '@/api/flyff-electric-service';
import { itemElectricSchema } from '@/schemas/item-schema';

export const itemCollection = createCollection(
  electricCollectionOptions({
    id: 'items',
    shapeOptions: {
      url: flyffElectricService.urls.items,
      fetchClient: flyffElectricService.asFetch,
    },
    schema: itemElectricSchema,
    getKey: (item) => item.id,
  }),
);
