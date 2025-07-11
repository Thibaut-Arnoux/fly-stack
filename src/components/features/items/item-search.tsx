import { Search } from '@/components/search';
import {
  useApiOptionsActions,
  useApiOptionsLikes,
} from '@/hooks/stores/use-api-options';

export const ItemSearch = () => {
  const likes = useApiOptionsLikes();
  const search = likes.find((like) => like.field === 'name.en')?.value ?? '';
  const { upsertLike } = useApiOptionsActions();

  return (
    <Search
      className="mt-2"
      search={search}
      onSearchChange={(value) => {
        upsertLike({ field: 'name.en', value });
      }}
    />
  );
};
