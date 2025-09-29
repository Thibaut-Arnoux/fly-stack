import { useLiveQuery } from '@tanstack/react-db';
import { itemCollection } from '@/collections/item-collection';

export const useItemCategory = () => {
  const { data: categories } = useLiveQuery((q) =>
    q
      .from({ item: itemCollection })
      .select(({ item }) => ({
        category: item.category,
      }))
      .distinct()
      .orderBy(({ item }) => item.category, 'asc'),
  );

  return (categories ?? []).map((r) => r.category);
};
