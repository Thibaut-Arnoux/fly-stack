import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { flyffService } from '@/api/flyff-service';
import { useApiOptionsActions } from '@/hooks/stores/use-api-options';
import type { SearchPaginatedOptions } from '@/types/api';
import { getPaginatedQueryKey } from '@/utils/query';

export const useItemOptions = (searchOptions: SearchPaginatedOptions) => {
  return queryOptions({
    queryKey: getPaginatedQueryKey('items', searchOptions),
    queryFn: () => flyffService.getItems(searchOptions),
  });
};

export const useItemData = (searchOptions: SearchPaginatedOptions) => {
  const { setPageLimit } = useApiOptionsActions();
  const itemsQueryOptions = useItemOptions(searchOptions);
  const suspenseData = useSuspenseQuery(itemsQueryOptions);

  useEffect(() => {
    if (suspenseData.isSuccess) {
      setPageLimit({
        firstPage: suspenseData.data.first,
        lastPage: suspenseData.data.last,
      });
    }
  }, [
    suspenseData.isSuccess,
    suspenseData.data?.first,
    suspenseData.data?.last,
    setPageLimit,
  ]);

  return suspenseData;
};
