import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type Table,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import {
  createContext,
  type HtmlHTMLAttributes,
  type PropsWithChildren,
  useMemo,
  useState,
} from 'react';
import { arrEqualsSome } from '@/components/ui/tables/filters/fn/arr-equals-some';
import { useDataTable } from '@/components/ui/tables/hooks/use-data-table';
import { useFilteringSearchParams } from '@/components/ui/tables/hooks/use-filtering-search-params';
import { useSortingSearchParams } from '@/components/ui/tables/hooks/use-sorting-search-params';
import { getEnabledColumnIds } from '@/components/ui/tables/utils/get-enabled-column-ids';
import { cn } from '@/utils/cn';

export type DataTableContextType<TData> = {
  table: Table<TData>;
};

function createDataTableContext<TData>() {
  return createContext<DataTableContextType<TData> | null>(null);
}

// biome-ignore lint/suspicious/noExplicitAny: cast any for Provider, will be overrided in custom hook
export const DataTableContext = createDataTableContext<any>();

const arrayFilterFns = new Set([
  // build in array filters
  'arrIncludes',
  'arrIncludesAll',
  'arrIncludesSome',
  'inNumberRange',
  // custom array filters
  'arrEqualsSome',
]);

export const DataTableProvider = <TData,>({
  data,
  columns,
  paginationState = { pageIndex: 0, pageSize: 20 },
  children,
}: PropsWithChildren<{
  data: TData[];
  // biome-ignore lint/suspicious/noExplicitAny: TanStack Table uses complex union types for columns
  columns: ColumnDef<TData, any>[];
  paginationState?: PaginationState;
}>) => {
  const [pagination, setPagination] =
    useState<PaginationState>(paginationState);

  const filterColumns = useMemo(
    () => getEnabledColumnIds(columns, 'enableColumnFilter'),
    [columns],
  );

  const sortColumns = useMemo(
    () => getEnabledColumnIds(columns, 'enableSorting'),
    [columns],
  );

  const arrayFilterColumns = useMemo(() => {
    return columns
      .filter(
        (col) =>
          col.id &&
          typeof col.filterFn === 'string' &&
          arrayFilterFns.has(col.filterFn),
      )
      .map((col) => col.id as string);
  }, [columns]);

  const { sorting, onSortingChange } = useSortingSearchParams({ sortColumns });
  const { columnFilters, onColumnFiltersChange } = useFilteringSearchParams({
    filterColumns,
    arrayFilterColumns,
  });

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      sortUndefined: 'last',
    },
    filterFns: {
      arrEqualsSome,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onSortingChange,
    onColumnFiltersChange,
    state: {
      pagination,
      sorting,
      columnFilters,
    },
    autoResetPageIndex: false,
    enableMultiSort: false,
  });

  return (
    <DataTableContext.Provider value={{ table }}>
      {children}
    </DataTableContext.Provider>
  );
};

export const DataTable = <TData,>({
  className,
  ...props
}: HtmlHTMLAttributes<HTMLTableElement>) => {
  const { table } = useDataTable<TData>();

  return (
    <table {...props} className={cn('table', className)}>
      <thead>
        <tr>
          {table.getFlatHeaders().map((header) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              style={{ width: header.getSize() }}
            >
              <button
                type="button"
                className={`w-full flex items-center gap-2
                              ${
                                header.column.getCanSort()
                                  ? 'group cursor-pointer select-none'
                                  : ''
                              }`}
                onClick={header.column.getToggleSortingHandler()}
                onKeyDown={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {
                  {
                    asc: <ArrowUp size={18} className="min-w-4.5" />,
                    desc: <ArrowDown size={18} className="min-w-4.5" />,
                    false: header.column.getCanSort() ? (
                      <span className="hidden group-hover:inline-flex">
                        <ArrowUpDown size={18} className="min-w-4.5" />
                      </span>
                    ) : null,
                  }[String(header.column.getIsSorted())]
                }
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={table.getAllColumns().length}>
              <div className="flex flex-col items-center justify-center h-96">
                <div className="text-lg font-medium">No data available</div>
                <div className="text-sm mt-1">
                  Try adjusting your search or filter criteria
                </div>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
