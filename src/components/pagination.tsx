import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
  page: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  pageStatus: {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
  };
};

export const Pagination = ({
  page,
  onPageChange,
  pageStatus,
}: PaginationProps) => {
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
      <button
        type="button"
        className="join-item btn"
        disabled={page === pageStatus.first}
        onClick={handleFirstPage}
      >
        <ChevronsLeft size={16} />
      </button>
      <button
        type="button"
        className="join-item btn"
        disabled={pageStatus.prev === null}
        onClick={handlePrevPage}
      >
        <ChevronLeft size={16} />
      </button>
      <button type="button" className="join-item btn">
        {page}
      </button>
      <button
        type="button"
        className="join-item btn"
        disabled={pageStatus.next === null}
        onClick={handleNextPage}
      >
        <ChevronRight size={16} />
      </button>
      <button
        type="button"
        className="join-item btn"
        disabled={page === pageStatus.last}
        onClick={handleLastPage}
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
};
