import { Pagination } from '@/components/pagination';
import {
  useItemsData,
  useItemsOptions,
} from '@/hooks/flyff-service/use-items-data';
import { getItemIconUrl } from '@/utils/image';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowUp } from 'lucide-react';
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
    <>
      <div className="flex-1 overflow-y-auto p-2">
        <table className="table">
          <thead>
            <tr>
              <th>Icon</th>
              <th className="flex flex-row gap-2 group items-center">
                <div>Name</div>
                <ArrowUp
                  className="cursor-pointer hidden group-hover:block"
                  size={16}
                />
              </th>
              <th>Sex</th>
              <th>Level</th>
              <th>Rarity</th>
              <th>Category</th>
              <th>SubCategory</th>
              <th>Sell</th>
            </tr>
          </thead>

          <tbody>
            {items.data.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={getItemIconUrl(item.icon)} alt="item-icon" />
                </td>
                <td>{item.name.en}</td>
                <td>{item.sex}</td>
                <td>{item.level}</td>
                <td>{item.rarity}</td>
                <td>{item.category}</td>
                <td>{item.subcategory}</td>
                <td>{item.sellPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center my-1">
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
    </>
  );
}
