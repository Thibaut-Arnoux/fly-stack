import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  type Table,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import {
  createContext,
  type HtmlHTMLAttributes,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

type DataTableContextType<TData> = {
  table: Table<TData>;
};

function createDataTableContext<TData>() {
  return createContext<DataTableContextType<TData> | null>(null);
}

// biome-ignore lint/suspicious/noExplicitAny: cast any for Provider, will be overrided in custom hook
const DataTableContext = createDataTableContext<any>();

export const useDataTableContext = <TData,>() => {
  const ctx = useContext(
    DataTableContext,
  ) as DataTableContextType<TData> | null;

  if (!ctx)
    throw new Error(
      'useDataTableContext must be used inside <DataTableProvider>',
    );

  return ctx;
};

export const DataTableProvider = <TData,>({
  data,
  columns,
  paginationState = { pageIndex: 0, pageSize: 20 },
  sortingState = [],
  columnFiltersState = [],
  children,
}: PropsWithChildren<{
  data: TData[];
  // biome-ignore lint/suspicious/noExplicitAny: flexible type for accessor
  columns: ColumnDef<TData, any>[];
  paginationState?: PaginationState;
  sortingState?: SortingState;
  columnFiltersState?: ColumnFiltersState;
}>) => {
  const [pagination, setPagination] =
    useState<PaginationState>(paginationState);
  const [sorting, setSorting] = useState<SortingState>(sortingState);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(columnFiltersState);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      sortUndefined: 'last', // global behavior to manage undefined
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
  className = '',
  ...props
}: HtmlHTMLAttributes<HTMLTableElement>) => {
  const { table } = useDataTableContext<TData>();

  return (
    <table {...props} className={`table ${className}`}>
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
                    asc: <ArrowUp size={18} className="min-w-[18px]" />,
                    desc: <ArrowDown size={18} className="min-w-[18px]" />,
                    false: header.column.getCanSort() ? (
                      <span className="hidden group-hover:inline-flex">
                        <ArrowUpDown size={18} className="min-w-[18px]" />
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
