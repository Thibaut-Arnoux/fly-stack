import { ItemPagination } from '@/components/features/items/item-pagination';
import { ItemSearch } from '@/components/features/items/item-search';
import { ItemTable } from '@/components/features/items/item-table';
import { useItemOptions } from '@/hooks/flyff-service/use-item-data';
import { itemStore } from '@/stores/item-store';
import { createFileRoute } from '@tanstack/react-router';

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
        <ItemTable />
      </div>

      <div className="flex justify-center my-1">
        <ItemPagination />
      </div>
    </>
  );
}
