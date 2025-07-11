import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { ItemDatagrid } from '@/components/features/items/item-datagrid';
import { ItemPagination } from '@/components/features/items/item-pagination';
import { ItemSearch } from '@/components/features/items/item-search';
import { itemsQueryOptions } from '@/hooks/flyff-service/use-item-data';
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
      <div className="flex justify-end mr-2">
        <ItemSearch />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <ItemDatagrid />
      </div>

      <div className="flex justify-center my-1">
        <ItemPagination />
      </div>
    </>
  );
}
