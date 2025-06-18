import { queryOptions } from '@tanstack/react-query';
import { flyffService } from '@/api/flyff-service';

export const useClassData = () => {
  const classesQueryOptions = queryOptions({
    queryKey: ['classes'],
    queryFn: () => flyffService.getClasses(),
  });

  return {
    classesQueryOptions,
  };
};
