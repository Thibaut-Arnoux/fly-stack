import { Loader } from '@/components/loader';
import {
  Table,
  type TableHeaderCellProps,
  type TableHeaderSort,
} from '@/components/table';
import { useItemData } from '@/hooks/flyff-service/use-item-data';
import {
  useItemActions,
  usePage,
  useSearch,
  useSorts,
} from '@/hooks/stores/use-item-store';
import { getItemIconUrl } from '@/utils/image';
import { Suspense } from 'react';

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
    <Table.Cell>
      <Loader />
    </Table.Cell>
  </Table.Row>
);

const NoDataRows = () => (
  <Table.Row>
    <Table.Cell className="fixed inset-0 flex items-center justify-center">
      <span>No Data</span>
    </Table.Cell>
  </Table.Row>
)

const ItemTableHeader = () => {
  const { addOrUpdateSort, removeSort } = useItemActions();

  const handleSort = (field: string, order: TableHeaderSort) => {
    if (order === null) {
      removeSort(field);
    } else {
      addOrUpdateSort({ field, order });
    }
  };

  const columns: TableHeaderCellProps[] = [
    {
      field: 'icon',
      headerName: 'Icon',
      className: 'w-[5%]',
    },
    {
      field: 'name.en',
      headerName: 'Name',
      className: 'w-[30%]',
      sortable: true,
      onSort: handleSort,
    },
    {
      field: 'sex',
      headerName: 'Sex',
      className: 'w-[5%]',
      sortable: true,
      onSort: handleSort,
    },
    {
      field: 'level',
      headerName: 'Level',
      className: 'w-[5%]',
      sortable: true,
      defaultSort: 'asc',
      onSort: handleSort,
    },
    {
      field: 'rarity',
      headerName: 'Rarity',
      className: 'w-[15%]',
      sortable: true,
      onSort: handleSort,
    },
    {
      field: 'category',
      headerName: 'Category',
      className: 'w-[15%]',
      sortable: true,
      onSort: handleSort,
    },
    {
      field: 'subcategory',
      headerName: 'SubCategory',
      className: 'w-[15%]',
      sortable: true,
      onSort: handleSort,
    },
    {
      field: 'sellPrice',
      headerName: 'Sell',
      className: 'w-[10%]',
      sortable: true,
      onSort: handleSort,
    },
  ];

  return (
    <Table.Header>
      <Table.Row>
        {columns.map((column) => (
          <Table.HeaderCell key={column.field} {...column} />
        ))}
      </Table.Row>
    </Table.Header>
  );
};

const ItemTableBody = () => {
  const search = useSearch();
  const page = usePage();
  const sorts = useSorts();

  const { data: items } = useItemData({
    page,
    likes: [{ field: 'name.en', value: search }],
    sorts,
  });

  // TODO : use fields defined in columns to respect DRY principle
  return (
    <>
      {items.data.length === 0 ? <NoDataRows /> : items.data.map((item) => (
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
