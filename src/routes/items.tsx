import { Pagination } from '@/components/pagination';
import {
  useItemsData,
  useItemsOptions,
} from '@/hooks/flyff-service/use-item-data';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/items')({
  loader: ({ context: { queryClient } }) => {
    const itemsQueryOptions = useItemsOptions({ page: 1 });
    queryClient.ensureQueryData(itemsQueryOptions);
  },
  component: Items,
});

function Items() {
  const [page, setPage] = useState(1);

  const { data: items } = useItemsData({ page: page });

  return (
    <div className="p-2">
      <h3>Items :</h3>
      {items.data.map((item) => (
        <div key={item.id}>
          <h4>{item.name.en}</h4>
        </div>
      ))}

      <Pagination
        page={page}
        onPageChange={setPage}
        pageStatus={{
          first: items.first,
          prev: items.prev,
          next: items.next,
          last: items.last,
        }}
      />
    </div>
  );
}
