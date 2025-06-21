import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { flyffService } from '@/api/flyff-service';
import type { SearchPaginatedOptions } from '@/types/api';
import { getPaginatedQueryKey } from '@/utils/query';
import { useApiOptions } from '../providers/use-api-provider';

export const useItemOptions = (searchOptions: SearchPaginatedOptions) => {
  return queryOptions({
    queryKey: getPaginatedQueryKey('items', searchOptions),
    queryFn: () => flyffService.getItems(searchOptions),
  });
};

export const useItemData = (searchOptions: SearchPaginatedOptions) => {
  const { state, dispatch } = useApiOptions();
  const itemsQueryOptions = useItemOptions(searchOptions);
  const suspenseData = useSuspenseQuery(itemsQueryOptions);

  useEffect(() => {
    if (
      suspenseData.isSuccess &&
      (state.pageLimit.first !== suspenseData.data.first ||
        state.pageLimit.last !== suspenseData.data.last)
    ) {
      dispatch({
        type: 'setPageLimit',
        pageLimit: {
          first: suspenseData.data.first,
          last: suspenseData.data.last,
        },
      });
    }
  }, [
    suspenseData.isSuccess,
    suspenseData.data?.first,
    suspenseData.data?.last,
    state.pageLimit.first,
    state.pageLimit.last,
    dispatch,
  ]);

  return suspenseData;
};
