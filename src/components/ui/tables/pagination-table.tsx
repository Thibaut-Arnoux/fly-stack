import { Pagination } from '@/components/ui/navigations/pagination';
import { useDataTableContext } from '@/components/ui/tables/data-table';

export const PaginationTable = () => {
  const { table } = useDataTableContext();

  return (
    <Pagination
      page={table.getState().pagination.pageIndex + 1}
      onPageChange={(page) => {
        table.setPagination((prev) => ({
          ...prev,
          pageIndex: page - 1,
        }));
      }}
      firstPage={1}
      lastPage={table.getPageCount()}
    />
  );
};
