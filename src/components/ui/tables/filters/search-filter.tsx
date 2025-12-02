import { SearchBar } from '@/components/ui/inputs/search-bar';
import { useDataTableContext } from '@/components/ui/tables/data-table';
import type { DisplayItem } from '@/schemas/item-schema';

export const SearchFilter = ({ column }: { column: string }) => {
  const { table } = useDataTableContext<DisplayItem>();
  const search = String(table.getColumn(column)?.getFilterValue() ?? '');

  return (
    <SearchBar
      // re-mount the component to reset the input value, tricks for uncontrolled inputs
      key={search ? 'active' : 'idle'}
      search={search}
      onSearchChange={(value) => {
        table.firstPage();
        table.getColumn(column)?.setFilterValue(value);
      }}
    />
  );
};
