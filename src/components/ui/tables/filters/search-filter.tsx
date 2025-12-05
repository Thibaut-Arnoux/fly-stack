import { SearchBar } from '@/components/ui/inputs/search-bar';
import { useDataTable } from '@/components/ui/tables/hooks/use-data-table';
import type { DisplayItem } from '@/schemas/item-schema';

export const SearchFilter = ({ column }: { column: string }) => {
  const { table } = useDataTable<DisplayItem>();
  const search = String(table.getColumn(column)?.getFilterValue() ?? '');

  return (
    <SearchBar
      search={search}
      onSearchChange={(value) => {
        table.firstPage();
        table.getColumn(column)?.setFilterValue(value);
      }}
    />
  );
};
