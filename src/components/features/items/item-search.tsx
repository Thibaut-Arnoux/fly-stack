import { Search } from '@/components/search';
import { useItemActions, useSearch } from '@/hooks/stores/use-item-store';

export const ItemSearch = () => {
  const search = useSearch();
  const { setSearch } = useItemActions();

  return <Search className="mt-2" search={search} onSearchChange={setSearch} />;
};
