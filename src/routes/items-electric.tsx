import { useLiveQuery } from '@tanstack/react-db';
import { createFileRoute } from '@tanstack/react-router';
import { createColumnHelper, type SortingState } from '@tanstack/react-table';
import { useMemo } from 'react';
import { itemCollection } from '@/collections/item-collection';
import {
  DataTable,
  DataTableProvider,
} from '@/components/ui/tables/data-table';
import { PaginationTable } from '@/components/ui/tables/pagination-table';
import { SearchTable } from '@/components/ui/tables/search-table';
import type { DisplayItemElectric } from '@/schemas/item-schema';

export const Route = createFileRoute('/items-electric')({
  loader: () => itemCollection.preload(),
  component: ItemsElectric,
});

function ItemsElectric() {
  const { data: items } = useLiveQuery((q) =>
    q.from({ item: itemCollection }).select(({ item }) => ({
      id: item.id,
      icon: item.icon,
      name: item.name,
      description: item.description,
      sex: item.sex,
      rarity: item.rarity,
      category: item.category,
      subcategory: item.subcategory,
      level: item.level,
    })),
  );

  const sortingState: SortingState = [
    {
      id: 'level',
      desc: false,
    },
  ];

  const columnHelper = createColumnHelper<DisplayItemElectric>();
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

  return (
    <DataTableProvider
      data={items}
      columns={columns}
      sortingState={sortingState}
    >
      <div className="flex justify-end gap-2 mr-2 mt-2">
        <SearchTable column="name" />
      </div>
      <div className="flex-1 overflow-y-auto ">
        <DataTable className="table-fixed table-zebra" />
      </div>
      <div className="flex justify-center my-1">
        <PaginationTable />
      </div>
    </DataTableProvider>
  );
}
