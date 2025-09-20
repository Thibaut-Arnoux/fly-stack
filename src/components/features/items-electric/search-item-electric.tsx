import { SearchBar } from '@/components/ui/inputs/search-bar';
import { useDataTableContext } from '@/components/ui/tables/data-table';
import type { DisplayItemElectric } from '@/schemas/item-schema';

export const SearchItemElectric = () => {
  const { table } = useDataTableContext<DisplayItemElectric>();

  return (
    <SearchBar
      search={String(table.getColumn('name')?.getFilterValue() ?? '')}
      onSearchChange={(value) => {
        table.firstPage();
        table.getColumn('name')?.setFilterValue(value);
      }}
    />
  );
};
