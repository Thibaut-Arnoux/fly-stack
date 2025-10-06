import { CheckboxListFilter } from '@/components/ui/tables/filters/checkbox-list-filter';
import { useItemRarity } from '@/hooks/items/use-item-rarity';

export const FilterRarity = () => {
  const rarities = useItemRarity();

  return <CheckboxListFilter data={rarities} column="rarity" />;
};
