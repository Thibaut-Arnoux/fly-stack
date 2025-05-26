import { flyffService } from '@/api/flyff-service';
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
  const itemsQueryOptions = useItemsOptions(searchOptions);

  return useSuspenseQuery(itemsQueryOptions);
};
