import { SearchBar } from '@/components/ui/inputs/search-bar';
import { useDataTableContext } from '@/components/ui/tables/data-table';
import type { DisplayItemElectric } from '@/schemas/item-schema';

export const SearchFilter = ({ column }: { column: string }) => {
  const { table } = useDataTableContext<DisplayItemElectric>();

  return (
    <SearchBar
      search={String(table.getColumn(column)?.getFilterValue() ?? '')}
      onSearchChange={(value) => {
        table.firstPage();
        table.getColumn(column)?.setFilterValue(value);
      }}
    />
  );
};
