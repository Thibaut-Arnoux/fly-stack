import { useItemData } from '@/hooks/flyff-service/use-item-data';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items')({
  loader: ({ context: { queryClient } }) => {
    const { itemsQueryOptions } = useItemData();
    queryClient.ensureQueryData(itemsQueryOptions);
  },
  component: Items,
});

function Items() {
  const { itemsQueryOptions } = useItemData();
  const itemsQuery = useSuspenseQuery(itemsQueryOptions);
  const items = itemsQuery.data;

  console.debug(items);

  return (
    <div className="p-2">
      <h3>Items :</h3>
      {items.map((item) => (
        <div key={item.id}>
          <h4>{item.name.en}</h4>
        </div>
      ))}
    </div>
  );
}
