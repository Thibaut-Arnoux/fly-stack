import { useLiveQuery } from '@tanstack/react-db';
import { itemCollection } from '@/collections/item-collection';
import type { ItemRarity } from '@/enums/item-rarity-enum';

export const useItemRarity = () => {
  const { data: rarities } = useLiveQuery((q) =>
    q
      .from({ item: itemCollection })
      .select(({ item }) => ({
        rarity: item.rarity,
      }))
      .distinct()
      .orderBy(({ item }) => item.rarity, 'asc'),
  );

  return (rarities ?? [])
    .map((r) => r.rarity)
    .filter((v): v is ItemRarity => v !== null);
};
