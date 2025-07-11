import { queryOptions, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { flyffService } from '@/api/flyff-service';
import { useApiOptionsActions } from '@/hooks/stores/use-api-options';
import type { SearchPaginatedOptions } from '@/types/api';
import { getPaginatedQueryKey } from '@/utils/query';

export const itemsQueryOptions = (searchOptions: SearchPaginatedOptions) => {
  return queryOptions({
    queryKey: getPaginatedQueryKey('items', searchOptions),
    queryFn: ({ signal }) => flyffService.getItems(searchOptions, signal),
  });
};

export const useItemsQuery = (searchOptions: SearchPaginatedOptions) => {
  const { setPageLimit } = useApiOptionsActions();
  const itemsQuery = useQuery(itemsQueryOptions(searchOptions));

  useEffect(() => {
    if (itemsQuery.isSuccess) {
      setPageLimit({
        firstPage: itemsQuery.data.first,
        lastPage: itemsQuery.data.last,
      });
    }
  }, [
    itemsQuery.isSuccess,
    itemsQuery.data?.first,
    itemsQuery.data?.last,
    setPageLimit,
  ]);

  return itemsQuery;
};
