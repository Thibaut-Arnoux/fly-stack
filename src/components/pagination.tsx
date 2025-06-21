import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

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
