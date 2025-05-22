import { ItemTable } from '@/components/feature/items/item-table';
import { Pagination } from '@/components/pagination';
import { useItemsOptions } from '@/hooks/flyff-service/use-items-data';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/items')({
  loader: ({ context: { queryClient } }) => {
    const itemsQueryOptions = useItemsOptions({ page: 1 });

    return queryClient.ensureQueryData(itemsQueryOptions);
  },
  component: Items,
});

function Items() {
  const items = Route.useLoaderData();
  const [page, setPage] = useState(items.first);

  return (
    <>
      <div className="flex-1 overflow-y-auto p-2">
        <ItemTable page={page} />
      </div>

      <div className="flex justify-center my-1">
        <Pagination
          page={page}
          onPageChange={setPage}
          pageData={{
            first: items.first,
            last: items.last,
          }}
        />
      </div>
    </>
  );
}
