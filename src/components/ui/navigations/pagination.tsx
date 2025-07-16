import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';

type PaginationProps = {
  page: number;
  onPageChange: (page: number) => void;
  firstPage: number;
  lastPage: number;
};

export const Pagination = ({
  page,
  onPageChange,
  firstPage,
  lastPage,
}: PaginationProps) => {
  const pageStatus = {
    first: firstPage,
    last: lastPage,
    // derivate prev, next and not using api return due to unnecessary re-render
    // caused by update of prev, next on each call contrary to first and last
    prev: page === firstPage ? null : page - 1,
    next: page === lastPage ? null : page + 1,
  };

  const handleFirstPage = () => {
    onPageChange(pageStatus.first);
  };

  const handlePrevPage = () => {
    if (pageStatus.prev) onPageChange(pageStatus.prev);
  };

  const handleNextPage = () => {
    if (pageStatus.next) onPageChange(pageStatus.next);
  };

  const handleLastPage = () => {
    onPageChange(pageStatus.last);
  };

  return (
    <div className="join">
      <IconButton
        className="join-item"
        disabled={page === pageStatus.first}
        icon={<ChevronsLeft size={16} />}
        onClick={handleFirstPage}
      />
      <IconButton
        className="join-item"
        disabled={pageStatus.prev === null}
        icon={<ChevronLeft size={16} />}
        onClick={handlePrevPage}
      />
      <Button className="join-item">{page}</Button>
      <IconButton
        className="join-item"
        disabled={pageStatus.next === null}
        icon={<ChevronRight size={16} />}
        onClick={handleNextPage}
      />
      <IconButton
        className="join-item"
        disabled={page === pageStatus.last}
        icon={<ChevronsRight size={16} />}
        onClick={handleLastPage}
      />
    </div>
  );
};
