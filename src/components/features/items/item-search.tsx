import { Search } from '@/components/search';
import { useItemActions, useSearch } from '@/hooks/stores/use-item-store';

export const ItemSearch = () => {
  const search = useSearch();
  const { setSearch } = useItemActions();

  return <Search search={search} onSearchChange={setSearch} />;
};
