import { ItemPagination } from '@/components/feature/items/item-pagination';
import { ItemSearch } from '@/components/feature/items/item-search';
import { ItemTable } from '@/components/feature/items/item-table';
import { useItemsOptions } from '@/hooks/flyff-service/use-items-data';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items')({
  loader: ({ context: { queryClient } }) => {
    const itemsQueryOptions = useItemsOptions({
      page: 1,
      sorts: [{ field: 'level' }],
    });

    return queryClient.ensureQueryData(itemsQueryOptions);
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
