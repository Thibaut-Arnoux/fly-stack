import { Search } from '@/components/search';
import { useApiOptions } from '@/hooks/providers/use-api-options';

export const ItemSearch = () => {
  const { state, dispatch } = useApiOptions();
  const search =
    state.likes.find((like) => like.field === 'name.en')?.value ?? '';

  return (
    <Search
      className="mt-2"
      search={search}
      onSearchChange={(value) => {
        dispatch({
          type: 'upsertLike',
          like: { field: 'name.en', value },
        });
      }}
    />
  );
};
