import { useLiveQuery } from '@tanstack/react-db';
import { createFileRoute } from '@tanstack/react-router';
import {
  type ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { itemCollection } from '@/collections/item-collection';
import { SearchBar } from '@/components/ui/inputs/search-bar';
import { Pagination } from '@/components/ui/navigations/pagination';
import type { ItemElectric } from '@/schemas/item-schema';

export const Route = createFileRoute('/items-electric')({
  loader: () => itemCollection.preload(),
  component: ItemsElectric,
});

type DisplayItem = Pick<
  ItemElectric,
  | 'id'
  | 'icon'
  | 'name'
  | 'description'
  | 'sex'
  | 'rarity'
  | 'category'
  | 'subcategory'
  | 'level'
>;

function ItemsElectric() {
  const { data: items } = useLiveQuery((q) => q.from({ item: itemCollection }));
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'level',
      desc: false,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columnHelper = createColumnHelper<DisplayItem>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'icon',
        header: 'Icon',
        cell: (props) => (
          <img
            width={32}
            height={32}
            className="min-w-[32px]" // avoid shrink img size on reduced window
            src={`${import.meta.env.VITE_FLYFF_API_BASE_URL}/image/item/${props.row.original.icon}`}
            alt={props.row.original.icon}
          />
        ),
        size: 50,
        enableSorting: false,
      }),
      columnHelper.accessor((row) => row.name?.en ?? undefined, {
        id: 'name',
        header: 'Name',
        cell: (props) => props.renderValue() ?? '-',
        size: 150,
        sortingFn: 'alphanumeric',
        filterFn: 'includesString',
      }),
      columnHelper.accessor(
        (row) =>
          (row.description.en ?? 'null') === 'null'
            ? undefined
            : row.description.en,
        {
          id: 'description',
          header: 'Description',
          cell: (props) => props.renderValue() ?? '-',
          size: 350,
          sortingFn: 'alphanumeric',
          sortDescFirst: false,
        },
      ),
      columnHelper.accessor((row) => row.sex ?? undefined, {
        id: 'sex',
        header: 'Sex',
        cell: (props) => props.renderValue() ?? '-',
        size: 50,
        sortingFn: 'text',
      }),
      columnHelper.accessor('rarity', {
        id: 'rarity',
        header: 'Rarity',
        cell: (props) => props.renderValue(),
        size: 80,
        sortingFn: 'text',
      }),
      columnHelper.accessor('category', {
        id: 'category',
        header: 'Category',
        cell: (props) => props.renderValue(),
        size: 80,
        sortingFn: 'text',
      }),
      columnHelper.accessor((row) => row.subcategory ?? undefined, {
        id: 'subcategory',
        header: 'Subcategory',
        cell: (props) => props.renderValue() ?? '-',
        size: 80,
        sortingFn: 'text',
      }),
      columnHelper.accessor('level', {
        id: 'level',
        cell: (props) => props.renderValue(),
        header: 'Level',
        size: 50,
        sortingFn: 'alphanumeric',
        sortDescFirst: false,
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data: items,
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
    <>
      <div className="flex justify-end gap-2 mr-2 mt-2">
        <SearchBar
          search={String(table.getColumn('name')?.getFilterValue() ?? '')}
          onSearchChange={(value) =>
            table.getColumn('name')?.setFilterValue(value)
          }
        />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <table className="w-full table table-fixed table-zebra">
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-1">
        <Pagination
          page={pagination.pageIndex + 1}
          onPageChange={(page) => {
            table.setPagination((prev) => ({
              ...prev,
              pageIndex: page - 1,
            }));
          }}
          firstPage={1}
          lastPage={table.getPageCount()}
        />
      </div>
    </>
  );
}
