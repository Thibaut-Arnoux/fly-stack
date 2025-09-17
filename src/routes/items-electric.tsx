import { useLiveQuery } from '@tanstack/react-db';
import { createFileRoute } from '@tanstack/react-router';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { itemCollection } from '@/collections/item-collection';
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
  const columnHelper = createColumnHelper<DisplayItem>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'icon',
        header: 'Icon',
        cell: (props) => (
          <img
            width={28}
            height={28}
            src={`${import.meta.env.VITE_FLYFF_API_BASE_URL}/image/item/${props.row.original.icon}`}
            alt={props.row.original.icon}
          />
        ),
        size: 30,
      }),
      columnHelper.accessor((row) => row.name.en, {
        id: 'name',
        cell: (props) => props.renderValue(),
        header: 'Name',
        size: 100,
      }),
      columnHelper.accessor('description.en', {
        id: 'description',
        header: 'Description',
        cell: (props) =>
          props.renderValue() === 'null' ? '-' : props.renderValue(),
        size: 250,
      }),
      columnHelper.accessor('sex', {
        id: 'sex',
        cell: (props) => props.renderValue(),
        header: 'Sex',
        size: 40,
      }),
      columnHelper.accessor('rarity', {
        id: 'rarity',
        cell: (props) => props.renderValue(),
        header: 'Rarity',
        size: 80,
      }),
      columnHelper.accessor('category', {
        id: 'category',
        cell: (props) => props.renderValue(),
        header: 'Category',
        size: 80,
      }),
      columnHelper.accessor('subcategory', {
        id: 'subcategory',
        cell: (props) => props.renderValue(),
        header: 'Subcategory',
        size: 80,
      }),
      columnHelper.accessor('level', {
        id: 'level',
        cell: (props) => props.renderValue(),
        header: 'Level',
        size: 20,
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    columns,
    data: items,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <>
      <div className="flex-1 overflow-y-auto p-2">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              {table.getFlatHeaders().map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}
                  className="text-left pr-2"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="py-2">
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
