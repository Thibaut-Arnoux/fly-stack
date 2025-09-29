import { useLiveQuery } from '@tanstack/react-db';
import { itemCollection } from '@/collections/item-collection';
import { ItemSubcategory } from '@/enums/item-subcategory-enum';

export const useItemSubcategory = () => {
  const { data: subcategories } = useLiveQuery((q) =>
    q
      .from({ item: itemCollection })
      .select(({ item }) => ({
        subcategory: item.subcategory,
      }))
      .distinct()
      .orderBy(({ item }) => item.subcategory, 'asc'),
  );

  return (subcategories ?? []).map((r) => r.subcategory).filter((v): v is ItemSubcategory => v !== null);
};
