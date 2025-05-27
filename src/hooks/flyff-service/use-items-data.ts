import { flyffService } from '@/api/flyff-service';
import { useItemActions } from '@/hooks/store/use-item-store';
import type { SearchPaginatedOptions } from '@/types/api';
import { getPaginatedQueryKey } from '@/utils/query';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const useItemsOptions = (
  searchOptions: Omit<SearchPaginatedOptions, 'perPage'>,
) => {
  return queryOptions({
    queryKey: getPaginatedQueryKey('items', searchOptions),
    queryFn: () => flyffService.getItems(searchOptions),
  });
};

export const useItemsData = (
  searchOptions: Omit<SearchPaginatedOptions, 'perPage'>,
) => {
  const { setFirstPage, setLastPage } = useItemActions();
  const itemsQueryOptions = useItemsOptions(searchOptions);
  const suspenseData = useSuspenseQuery(itemsQueryOptions);

  if (suspenseData.isSuccess) {
    setFirstPage(suspenseData.data.first);
    setLastPage(suspenseData.data.last);
  }

  return suspenseData;
};
