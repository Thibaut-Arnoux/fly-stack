import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ItemDatagrid } from '@/components/features/items/item-datagrid';
import { ItemDatagridSkeleton } from '@/components/features/items/item-datagrid-skeleton';
import { ItemPagination } from '@/components/features/items/item-pagination';
import { ItemSearch } from '@/components/features/items/item-search';
import { useItemOptions } from '@/hooks/flyff-service/use-item-data';
import { itemStore } from '@/stores/item-store';

export const Route = createFileRoute('/items')({
  loader: ({ context: { queryClient } }) => {
    const itemQueryOptions = useItemOptions({
      page: itemStore.state.page,
      likes: [{ field: 'name.en', value: itemStore.state.search }],
      sorts: itemStore.state.sorts,
    });

    return queryClient.ensureQueryData(itemQueryOptions);
  },
  component: Items,
});

function Items() {
  return (
    <>
      <div className="flex justify-end mr-2">
        <ItemSearch />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <Suspense fallback={<ItemDatagridSkeleton />}>
          <ItemDatagrid />
        </Suspense>
      </div>

      <div className="flex justify-center my-1">
        <ItemPagination />
      </div>
    </>
  );
}
