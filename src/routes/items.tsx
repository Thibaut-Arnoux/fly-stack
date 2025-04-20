import { Pagination } from '@/components/pagination';
import { Table } from '@/components/table';
import {
  useItemsData,
  useItemsOptions,
} from '@/hooks/flyff-service/use-items-data';
import { getItemIconUrl } from '@/utils/image';
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
    <>
      <div className="flex-1 overflow-y-auto p-2">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Icon</Table.HeaderCell>
              <Table.HeaderCell sortable>Name</Table.HeaderCell>
              <Table.HeaderCell>Sex</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
              <Table.HeaderCell>Rarity</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>SubCategory</Table.HeaderCell>
              <Table.HeaderCell>Sell</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items.data.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <img src={getItemIconUrl(item.icon)} alt="item-icon" />
                </Table.Cell>
                <Table.Cell>{item.name.en}</Table.Cell>
                <Table.Cell>{item.sex}</Table.Cell>
                <Table.Cell>{item.level}</Table.Cell>
                <Table.Cell>{item.rarity}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>{item.subcategory}</Table.Cell>
                <Table.Cell>{item.sellPrice}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
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
