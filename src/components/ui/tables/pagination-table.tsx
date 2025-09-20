import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useDataTableContext } from '@/components/ui/tables/data-table';
import { Button } from '../buttons/button';
import { IconButton } from '../buttons/icon-button';

export const PaginationTable = () => {
  const { table } = useDataTableContext();

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
