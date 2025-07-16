import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { flyffService } from '@/api/flyff-service';

export const classesQueryOptions = queryOptions({
  queryKey: ['classes'],
  queryFn: () => flyffService.getClasses(),
});

export const useClassesQuery = () => useSuspenseQuery(classesQueryOptions);
