import { flyffService } from '@/api/flyff-service';
import type { SearchPaginatedOptions } from '@/types/api';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const useItemsOptions = ({
  page,
}: Omit<SearchPaginatedOptions, 'perPage'>) => {
  return queryOptions({
    queryKey: ['items', page],
    queryFn: () => flyffService.getItems({ page }),
  });
};

export const useItemsData = ({
  page,
}: Omit<SearchPaginatedOptions, 'perPage'>) => {
  const itemsQueryOptions = useItemsOptions({ page });

  return useSuspenseQuery(itemsQueryOptions);
};
