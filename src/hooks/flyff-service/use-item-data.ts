import { flyffService } from '@/api/flyff-service';
import { queryOptions } from '@tanstack/react-query';

export const useItemData = () => {
  const itemsQueryOptions = queryOptions({
    queryKey: ['items'],
    queryFn: () => flyffService.getItems(),
  });

  return {
    itemsQueryOptions,
  };
};
