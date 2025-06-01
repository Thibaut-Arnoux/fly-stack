import { Pagination } from '@/components/pagination';
import {
  useFirstPage,
  useLastPage,
  usePage,
} from '@/hooks/stores/use-item-store';
import { useItemActions } from '@/hooks/stores/use-item-store';

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
