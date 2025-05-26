import { Loader } from '@/components/loader';
import { Table } from '@/components/table';
import { useItemsData } from '@/hooks/flyff-service/use-items-data';
import { useDebounceValue } from 'usehooks-ts';
import {
  useItemActions,
  usePage,
  useSearch,
} from '@/hooks/store/use-item-store';
import { getItemIconUrl } from '@/utils/image';
import { Suspense, useEffect } from 'react';

export const ItemTable = () => {
  return (
    <Table>
      <ItemTableHeader />
      <Table.Body>
        <Suspense fallback={<LoadingRows />}>
          <ItemTableBody />
        </Suspense>
      </Table.Body>
    </Table>
  );
};

const LoadingRows = () => (
  <Table.Row>
    <Table.Cell colSpan={8}>
      <Loader />
    </Table.Cell>
  </Table.Row>
);

const ItemTableHeader = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell className="w-[5%]">Icon</Table.HeaderCell>
        <Table.HeaderCell className="w-[30%]">Name</Table.HeaderCell>
        <Table.HeaderCell className="w-[5%]">Sex</Table.HeaderCell>
        <Table.HeaderCell className="w-[5%]">Level</Table.HeaderCell>
        <Table.HeaderCell className="w-[15%]">Rarity</Table.HeaderCell>
        <Table.HeaderCell className="w-[15%]">Category</Table.HeaderCell>
        <Table.HeaderCell className="w-[15%]">SubCategory</Table.HeaderCell>
        <Table.HeaderCell className="w-[10%]">Sell</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

const ItemTableBody = () => {
  const [search] = useDebounceValue(useSearch(), 500);
  const page = usePage();
  const { setFirstPage, setLastPage } = useItemActions();

  const { data: items } = useItemsData({
    page,
    likes: [{ field: 'name.en', value: search }],
    sorts: [{ field: 'level' }], // default sort for the moment
  });

  // not found better way to update pagination with updated data
  useEffect(() => {
    setFirstPage(items.first);
    setLastPage(items.last);
  }, [items.first, items.last, setFirstPage, setLastPage]);

  return (
    <>
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
    </>
  );
};
