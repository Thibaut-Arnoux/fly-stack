import { Pagination } from '@/components/pagination';
import {
  useApiOptionsActions,
  useApiOptionsPage,
  useApiOptionsPageLimit,
} from '@/hooks/stores/use-api-options';

export const ItemPagination = () => {
  const page = useApiOptionsPage();
  const pageLimit = useApiOptionsPageLimit();
  const { setPage } = useApiOptionsActions();

  return (
    <Pagination
      page={page}
      onPageChange={setPage}
      firstPage={pageLimit.firstPage}
      lastPage={pageLimit.lastPage}
    />
  );
};
