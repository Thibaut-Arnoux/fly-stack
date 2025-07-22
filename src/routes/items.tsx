import { createFileRoute } from '@tanstack/react-router';
import { ListFilter } from 'lucide-react';
import { useEffect } from 'react';
import { FilterItem } from '@/components/features/items/filter-item';
import { ItemDatagrid } from '@/components/features/items/item-datagrid';
import { PaginationItem } from '@/components/features/items/pagination-item';
import { SearchItem } from '@/components/features/items/search-item';
import { Drawer } from '@/components/ui/layouts/drawer';
import { itemsQueryOptions } from '@/hooks/flyff-service/use-items-query';
import { useApiOptionsActions } from '@/hooks/stores/use-api-options';
import { apiOptionsStore } from '@/stores/api-options-store';

export const Route = createFileRoute('/items')({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      itemsQueryOptions({
        page: apiOptionsStore.state.page,
        likes: apiOptionsStore.state.likes,
        sorts: apiOptionsStore.state.sorts,
      }),
    );
  },
  component: Items,
});

function Items() {
  const { reset } = useApiOptionsActions();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
      <Drawer className="drawer-end">
        <Drawer.Content className="flex justify-end gap-2 mr-2 mt-2">
          <SearchItem />
          <Drawer.Trigger className="btn btn-square">
            <ListFilter size={16} />
          </Drawer.Trigger>
        </Drawer.Content>
        <Drawer.Side className="w-80">
          <FilterItem />
        </Drawer.Side>
      </Drawer>
      <div className="flex-1 overflow-y-auto p-2">
        <ItemDatagrid />
      </div>
      <div className="flex justify-center my-1">
        <PaginationItem />
      </div>
    </>
  );
}
