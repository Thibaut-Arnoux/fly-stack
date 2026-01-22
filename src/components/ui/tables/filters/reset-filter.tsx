import { RotateCcw } from 'lucide-react';
import { parseAsString, useQueryStates } from 'nuqs';
import type { ButtonHTMLAttributes } from 'react';
import { useMemo } from 'react';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { useDataTable } from '@/components/ui/tables/hooks/use-data-table';

export const ResetFilter = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { table } = useDataTable();

  const filterColumns = useMemo(
    () =>
      table
        .getAllColumns()
        .filter((col) => col.getCanFilter())
        .map((col) => col.id),
    [table],
  );

  const filterParsers = useMemo(
    () => Object.fromEntries(filterColumns.map((col) => [col, parseAsString])),
    [filterColumns],
  );

  const [, setQueryStates] = useQueryStates(filterParsers);

  return (
    <IconButton
      variant="ghost"
      className={className}
      {...props}
      icon={<RotateCcw size={16} />}
      onClick={() => {
        table.resetColumnFilters();
        table.firstPage();
        setQueryStates(
          Object.fromEntries(filterColumns.map((key) => [key, null])),
        );
      }}
    />
  );
};
