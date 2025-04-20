import { ArrowDown, ArrowUp } from 'lucide-react';
import type { PropsWithChildren } from 'react';
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

type TableCellProps = PropsWithChildren<{
  className?: string;
}>;

type TableHeaderCellProps = PropsWithChildren<{
  className?: string;
  sortable?: boolean;
  onSort?: (direction: 'asc' | 'desc' | null) => void;
}>;

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

Table.Cell = ({ children, className = '' }: TableCellProps) => {
  return <td className={className}>{children}</td>;
};

Table.HeaderCell = ({
  children,
  className = '',
  sortable,
  onSort,
}: TableHeaderCellProps) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null,
  );

  const handleSort = () => {
    let newDirection: 'asc' | 'desc' | null;
    switch (sortDirection) {
      case 'asc':
        newDirection = 'desc';
        break;
      case 'desc':
        newDirection = null;
        break;
      default:
        newDirection = 'asc';
    }
    setSortDirection(newDirection);
    onSort?.(newDirection);
  };

  return (
    <th className={className}>
      <div
        className={`flex flex-row gap-2 items-center ${sortable && 'group cursor-pointer'}`}
        onClick={handleSort}
        onKeyDown={handleSort}
      >
        {children}
        {sortable && (
          <div
            className={
              sortDirection === null ? 'hidden group-hover:block' : 'block'
            }
          >
            {sortDirection === 'desc' ? (
              <ArrowDown
                size={18}
                strokeWidth={sortDirection === null ? 2 : 3}
              />
            ) : (
              <ArrowUp size={18} strokeWidth={sortDirection === null ? 2 : 3} />
            )}
          </div>
        )}
      </div>
    </th>
  );
};
