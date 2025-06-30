import { Pagination } from '@/components/pagination';
import {
  useFirstPage,
  useItemActions,
  useLastPage,
  usePage,
} from '@/hooks/stores/use-api-options';

export const ItemPagination = () => {
  const page = usePage();
  const firstPage = useFirstPage();
  const lastPage = useLastPage();
  const { setPage } = useItemActions();

  return (
    <Pagination
      page={page}
      onPageChange={setPage}
      firstPage={firstPage}
      lastPage={lastPage}
    />
  );
};
