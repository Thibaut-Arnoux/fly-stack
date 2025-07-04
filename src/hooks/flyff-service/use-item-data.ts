import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { flyffService } from '@/api/flyff-service';
import { useItemActions } from '@/hooks/stores/use-item-store';
import type { SearchPaginatedOptions } from '@/types/api';
import { getPaginatedQueryKey } from '@/utils/query';

export const useItemOptions = (searchOptions: SearchPaginatedOptions) => {
  return queryOptions({
    queryKey: getPaginatedQueryKey('items', searchOptions),
    queryFn: () => flyffService.getItems(searchOptions),
  });
};

export const useItemData = (searchOptions: SearchPaginatedOptions) => {
  const { setFirstPage, setLastPage } = useItemActions();
  const itemsQueryOptions = useItemOptions(searchOptions);
  const suspenseData = useSuspenseQuery(itemsQueryOptions);

  useEffect(() => {
    if (suspenseData.isSuccess) {
      setFirstPage(suspenseData.data.first);
      setLastPage(suspenseData.data.last);
    }
  }, [
    suspenseData.isSuccess,
    suspenseData.data?.first,
    suspenseData.data?.last,
    setFirstPage,
    setLastPage,
  ]);

  return suspenseData;
};
