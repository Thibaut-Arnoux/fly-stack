import { coalesce, eq, useLiveQuery } from '@tanstack/react-db';
import { itemCollection } from '@/collections/item-collection';
import { itemUserCollection } from '@/collections/item-user-collection';

export const useItem = () => {
  return useLiveQuery((q) =>
    q
      .from({ item: itemCollection })
      .join({ itemUser: itemUserCollection }, ({ item, itemUser }) =>
        eq(item.id, itemUser.item_id),
      )
      .select(({ item, itemUser }) => ({
        ...item,
        item_user_id: itemUser?.id,
        favorite: eq(itemUser?.favorite, true),
        note: coalesce(itemUser?.note, null),
      }))
      .orderBy(({ item }) => item.item_id),
  );
};
