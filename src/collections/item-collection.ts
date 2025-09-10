import { flyffElectricService } from "@/api/flyff-electric-service";
import { ItemElectric } from "@/schemas/item-schema";
import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import { createCollection } from "@tanstack/react-db";

export const itemCollection = createCollection(
  electricCollectionOptions<ItemElectric>({
    id: 'items',
    shapeOptions: {
      url: flyffElectricService.urls.items,
      fetchClient: flyffElectricService.asFetch,
    },
    getKey: (item) => item.id,
  }),
);