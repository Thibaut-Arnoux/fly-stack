import { createFileRoute } from '@tanstack/react-router';
import { ListFilter } from 'lucide-react';
import { itemCollection } from '@/collections/item-collection';
import { itemUserCollection } from '@/collections/item-user-collection';
import { ItemDetailsModal } from '@/components/features/item-details/item-details-modal';
import { FilterItem } from '@/components/features/items/filter-item';
import { Drawer } from '@/components/ui/layouts/drawer';
import { ModalProvider } from '@/components/ui/modals/modal';
import {
  DataTable,
  DataTableProvider,
} from '@/components/ui/tables/data-table';
import { SearchFilter } from '@/components/ui/tables/filters/search-filter';
import { PaginationTable } from '@/components/ui/tables/pagination-table';
import { useItem } from '@/hooks/items/use-item';
import { useItemTableColumns } from '@/hooks/items/use-item-table-columns';

export const Route = createFileRoute('/items')({
  loader: async () => {
    await Promise.all([itemCollection.preload(), itemUserCollection.preload()]);
  },
  component: Items,
});

function Items() {
  const { data: items } = useItem();
  const columns = useItemTableColumns();

  return (
    <ModalProvider modal={<ItemDetailsModal />} position="middle" size="lg">
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
