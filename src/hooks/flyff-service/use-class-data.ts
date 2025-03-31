import { flyffService } from '@/api/flyff-service';
import { queryOptions } from '@tanstack/react-query';

export const useClassData = () => {
  const classesQueryOptions = queryOptions({
    queryKey: ['classes'],
    queryFn: () => flyffService.getClasses(),
  });

  return {
    classesQueryOptions,
  };
};
