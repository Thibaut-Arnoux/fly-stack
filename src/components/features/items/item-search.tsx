import { SearchBar } from '@/components/ui/inputs/search-bar';
import {
  useApiOptionsActions,
  useApiOptionsLikes,
} from '@/hooks/stores/use-api-options';

export const ItemSearch = () => {
  const likes = useApiOptionsLikes();
  const search = likes.find((like) => like.field === 'name.en')?.value ?? '';
  const { upsertLike } = useApiOptionsActions();

  return (
    <SearchBar
      search={search}
      onSearchChange={(value) => {
        upsertLike({ field: 'name.en', value });
      }}
    />
  );
};
