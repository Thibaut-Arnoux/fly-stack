import { CheckboxListFilter } from '@/components/ui/tables/filters/checkbox-list-filter';
import { useItemCategory } from '@/hooks/items/use-item-category';

export const FilterCategory = () => {
  const categories = useItemCategory();

  return <CheckboxListFilter data={categories} column="category" />;
};
