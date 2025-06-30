import { Pagination } from '@/components/pagination';
import {
  useApiOptionsPageLimit,
  useItemActions,
  usePage,
} from '@/hooks/stores/use-api-options';

export const ItemPagination = () => {
  const page = usePage();
  const pageLimit = useApiOptionsPageLimit();
  const { setPage } = useItemActions();

  return (
    <Pagination
      page={page}
      onPageChange={setPage}
      firstPage={pageLimit.firstPage}
      lastPage={pageLimit.lastPage}
    />
  );
};
