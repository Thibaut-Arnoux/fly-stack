import { CheckboxListFilter } from '@/components/ui/tables/filters/checkbox-list-filter';
import { useItemSubcategory } from '@/hooks/items/use-item-subcategory';

export const FilterSubcategory = () => {
  const subcategories = useItemSubcategory();

  return <CheckboxListFilter data={subcategories} column="subcategory" />;
};
