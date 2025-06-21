import { ArrowDown, ArrowUp } from 'lucide-react';
import type {
  PropsWithChildren,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { useState } from 'react';

type TableProps = PropsWithChildren<{
  className?: string;
}>;

type TableHeaderProps = PropsWithChildren<{
  className?: string;
}>;

type TableBodyProps = PropsWithChildren<{
  className?: string;
}>;

type TableRowProps = PropsWithChildren<{
  className?: string;
}>;

type TableCellProps = PropsWithChildren<TdHTMLAttributes<HTMLTableCellElement>>;

export type TableHeaderSort = 'asc' | 'desc' | null;

export type TableHeaderCellProps = {
  field: string;
  headerName: string;
  sortable?: boolean;
  sort?: TableHeaderSort;
  onSort?: (field: string, order: TableHeaderSort) => void;
} & ThHTMLAttributes<HTMLTableCellElement>;

export const Table = ({ children, className = '' }: TableProps) => {
  return <table className={`table ${className}`}>{children}</table>;
};

Table.Header = ({ children, className = '' }: TableHeaderProps) => {
  return <thead className={className}>{children}</thead>;
};

Table.Body = ({ children, className = '' }: TableBodyProps) => {
  return <tbody className={className}>{children}</tbody>;
};

Table.Row = ({ children, className = '' }: TableRowProps) => {
  return <tr className={className}>{children}</tr>;
};

Table.Cell = ({ children, ...props }: TableCellProps) => {
  return <td {...props}>{children}</td>;
};

Table.HeaderCell = ({
  field,
  headerName,
  sortable,
  sort: defaultSort,
  onSort,
  ...props
}: TableHeaderCellProps) => {
  const [sort, setSort] = useState<TableHeaderSort>(defaultSort ?? null);

  const handleSort = () => {
    let newSort: TableHeaderSort;
    switch (sort) {
      case 'asc':
        newSort = 'desc';
        break;
      case 'desc':
        newSort = null;
        break;
      default:
        newSort = 'asc';
    }
    setSort(newSort);
    onSort?.(field, newSort);
  };

  return (
    <th {...props}>
      <button
        type="button"
        className={`w-full flex flex-row gap-2 items-center ${sortable && 'group cursor-pointer'}`}
        onClick={handleSort}
        onKeyDown={handleSort}
      >
        {headerName}
        {sortable && (
          <div className={sort === null ? 'hidden group-hover:block' : 'block'}>
            {sort === 'desc' ? (
              <ArrowDown size={18} strokeWidth={sort === null ? 2 : 3} />
            ) : (
              <ArrowUp size={18} strokeWidth={sort === null ? 2 : 3} />
            )}
          </div>
        )}
      </button>
    </th>
  );
};
