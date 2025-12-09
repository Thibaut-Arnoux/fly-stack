import { useLiveQuery } from '@tanstack/react-db';
import { createFileRoute } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { ListFilter } from 'lucide-react';
import { useMemo } from 'react';
import { itemCollection } from '@/collections/item-collection';
import { FilterItem } from '@/components/features/items/filter-item';
import { ItemModal } from '@/components/features/items/item-modal';
import { Drawer } from '@/components/ui/layouts/drawer';
import { useModal } from '@/components/ui/modals/hooks/use-modal';
import { ModalProvider } from '@/components/ui/modals/modal';
import {
  DataTable,
  DataTableProvider,
} from '@/components/ui/tables/data-table';
import { arrEqualsSome } from '@/components/ui/tables/filters/fn/arr-equals-some';
import { SearchFilter } from '@/components/ui/tables/filters/search-filter';
import { PaginationTable } from '@/components/ui/tables/pagination-table';
import type { Item } from '@/schemas/item-schema';
import { isFilterEnabled, isSortEnabled } from '@/utils/is';

export const Route = createFileRoute('/items')({
  loader: () => itemCollection.preload(),
  component: Items,
});

const NameCell = ({ itemName, item }: { itemName?: string; item: Item }) => {
  const { open } = useModal<Item>();

  const handleClick = () => {
    open(item);
  };

  return (
    <button
      type="button"
      className="link link-hover text-left font-medium"
      onClick={handleClick}
    >
      {itemName ?? '-'}
    </button>
  );
};

function Items() {
  const { data: items } = useLiveQuery((q) => q.from({ item: itemCollection }));

  const columnHelper = createColumnHelper<Item>();
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
        enableSorting: isSortEnabled('icon'),
        enableColumnFilter: isFilterEnabled('icon'),
      }),
      columnHelper.accessor((row) => row.name?.en ?? undefined, {
        id: 'name',
        header: 'Name',
        cell: (props) => (
          <NameCell
            itemName={props.row.original.name?.en}
            item={props.row.original}
          />
        ),
        size: 150,
        enableSorting: isSortEnabled('name'),
        sortingFn: 'alphanumeric',
        enableColumnFilter: isFilterEnabled('name'),
        filterFn: 'includesString',
      }),
      columnHelper.accessor(
        (row) =>
          (row.description?.en ?? 'null') === 'null'
            ? undefined
            : row.description?.en,
        {
          id: 'description',
          header: 'Description',
          cell: (props) => props.renderValue() ?? '-',
          size: 250,
          enableSorting: isSortEnabled('description'),
          sortingFn: 'alphanumeric',
          sortDescFirst: false,
          enableColumnFilter: isFilterEnabled('description'),
        },
      ),
      columnHelper.accessor((row) => row.sex ?? undefined, {
        id: 'sex',
        header: 'Sex',
        cell: (props) => props.renderValue() ?? '-',
        size: 50,
        enableSorting: isSortEnabled('sex'),
        sortingFn: 'text',
        enableColumnFilter: isFilterEnabled('sex'),
      }),
      columnHelper.accessor('category', {
        id: 'category',
        header: 'Category',
        cell: (props) => props.renderValue(),
        size: 80,
        enableSorting: isSortEnabled('category'),
        sortingFn: 'text',
        enableColumnFilter: isFilterEnabled('category'),
        filterFn: 'arrIncludesSome',
      }),
      columnHelper.accessor((row) => row.subcategory ?? undefined, {
        id: 'subcategory',
        header: 'Subcategory',
        cell: (props) => props.renderValue() ?? '-',
        size: 80,
        enableSorting: isSortEnabled('subcategory'),
        sortingFn: 'text',
        enableColumnFilter: isFilterEnabled('subcategory'),
        filterFn: 'arrIncludesSome',
      }),
      columnHelper.accessor('rarity', {
        id: 'rarity',
        header: 'Rarity',
        cell: (props) => props.renderValue(),
        size: 80,
        enableSorting: isSortEnabled('rarity'),
        sortingFn: 'text',
        enableColumnFilter: isFilterEnabled('rarity'),
        filterFn: arrEqualsSome,
      }),
      columnHelper.accessor('level', {
        id: 'level',
        cell: (props) => props.renderValue(),
        header: 'Level',
        size: 50,
        enableSorting: isSortEnabled('level'),
        sortingFn: 'alphanumeric',
        sortDescFirst: false,
        enableColumnFilter: isFilterEnabled('level'),
        filterFn: 'inNumberRange',
      }),
    ],
    [columnHelper],
  );

  return (
    <ModalProvider modal={<ItemModal />} position="middle" size="lg">
      <DataTableProvider data={items} columns={columns}>
        <Drawer className="drawer-end h-full min-h-0">
          <Drawer.Content className="h-full flex flex-col min-h-0">
            <div className="flex justify-end gap-2 mr-2 mt-2">
              <SearchFilter column="name" />
              <Drawer.Trigger className="btn btn-square">
                <ListFilter size={16} />
              </Drawer.Trigger>
            </div>
            <div className="flex-1 overflow-y-auto">
              <DataTable className="table-fixed table-zebra" />
            </div>
            <div className="flex justify-center my-1">
              <PaginationTable />
            </div>
          </Drawer.Content>
          <Drawer.Side className="w-80">
            <FilterItem />
          </Drawer.Side>
        </Drawer>
      </DataTableProvider>
    </ModalProvider>
  );
}
