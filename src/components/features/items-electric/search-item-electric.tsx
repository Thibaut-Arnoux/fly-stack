import { SearchBar } from '@/components/ui/inputs/search-bar';
import { useDataTableContext } from '@/components/ui/tables/datatable';

export const SearchItemElectric = () => {
  const { table } = useDataTableContext();

  return (
    <SearchBar
      search={String(table.getColumn('name')?.getFilterValue() ?? '')}
      onSearchChange={(value) => table.getColumn('name')?.setFilterValue(value)}
    />
  );
};
