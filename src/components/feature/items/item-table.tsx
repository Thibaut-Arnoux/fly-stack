import { Loader } from '@/components/loader';
import { Table } from '@/components/table';
import { useItemsData } from '@/hooks/flyff-service/use-items-data';
import { getItemIconUrl } from '@/utils/image';
import { Suspense } from 'react';

export const ItemTable = ({ page }: { page: number }) => {
  return (
    <Table>
      <ItemTableHeader />
      <Table.Body>
        <Suspense fallback={<LoadingRows />}>
          <ItemTableBody page={page} />
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

const ItemTableBody = ({ page }: { page: number }) => {
  const { data: items } = useItemsData({ page: page });

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
