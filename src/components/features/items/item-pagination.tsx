import { Pagination } from '@/components/pagination';
import { useApiOptions } from '@/hooks/providers/use-api-provider';

export const ItemPagination = () => {
  const { state, dispatch } = useApiOptions();

  return (
    <Pagination
      page={state.page}
      onPageChange={(page) =>
        dispatch({
          type: 'setPage',
          page,
        })
      }
      firstPage={state.pageLimit.first}
      lastPage={state.pageLimit.last}
    />
  );
};
