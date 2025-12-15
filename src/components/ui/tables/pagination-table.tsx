import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useDataTable } from '@/components/ui/tables/hooks/use-data-table';
import { Button } from '../buttons/button';
import { IconButton } from '../buttons/icon-button';

export const PaginationTable = () => {
  const { table } = useDataTable();

  return (
    <div className="join">
      <IconButton
        className="join-item"
        disabled={!table.getCanPreviousPage()}
        icon={<ChevronsLeft size={16} />}
        onClick={table.firstPage}
      />
      <IconButton
        className="join-item"
        disabled={!table.getCanPreviousPage()}
        icon={<ChevronLeft size={16} />}
        onClick={table.previousPage}
      />
      <Button className="join-item">
        {table.getState().pagination.pageIndex + 1}
      </Button>
      <IconButton
        className="join-item"
        disabled={!table.getCanNextPage()}
        icon={<ChevronRight size={16} />}
        onClick={table.nextPage}
      />
      <IconButton
        className="join-item"
        disabled={!table.getCanNextPage()}
        icon={<ChevronsRight size={16} />}
        onClick={table.lastPage}
      />
    </div>
  );
};
