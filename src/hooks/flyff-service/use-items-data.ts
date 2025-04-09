import { flyffService } from '@/api/flyff-service';
import type { PaginatedOptions } from '@/types/api';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const useItemsOptions = ({
  page,
}: Omit<PaginatedOptions, 'perPage'>) => {
  return queryOptions({
    queryKey: ['items', page],
    queryFn: () => flyffService.getItems({ page }),
  });
};

export const useItemsData = ({ page }: Omit<PaginatedOptions, 'perPage'>) => {
  const itemsQueryOptions = useItemsOptions({ page });

  return useSuspenseQuery(itemsQueryOptions);
};
