import { Suspense } from 'react';
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
import type { Item } from '@/schemas/item';
import type { ColumnsConfiguration } from '@/types/table';
import { getItemIconUrl } from '@/utils/image';

type ItemColumns = ColumnsConfiguration<Item>;

export const ItemTable = () => {
  const { addOrUpdateSort, removeSort } = useItemActions();

  const handleSort = (field: string, order: TableHeaderSort) => {
    if (order === null) {
      removeSort(field);
    } else {
      addOrUpdateSort({ field, order });
    }
  };

  const columns: ItemColumns = [
    {
      field: 'icon',
      headerName: 'Icon',
      className: 'w-[5%]',
      renderCell: (row) => <img src={getItemIconUrl(row.icon)} alt="icon" />,
    },
    {
      field: 'name.en',
      headerName: 'Name',
      className: 'w-[30%]',
      sortable: true,
      onSort: handleSort,
      renderCell: (row) => <>{row.name.en}</>,
    },
    {
      field: 'sex',
      headerName: 'Sex',
      className: 'w-[5%]',
      sortable: true,
      onSort: handleSort,
      renderCell: (row) => <>{row.sex}</>,
    },
    {
      field: 'level',
      headerName: 'Level',
      className: 'w-[5%]',
      sortable: true,
      defaultSort: 'asc',
      onSort: handleSort,
      renderCell: (row) => <>{row.level}</>,
    },
    {
      field: 'rarity',
      headerName: 'Rarity',
      className: 'w-[15%]',
      sortable: true,
      onSort: handleSort,
      renderCell: (row) => <>{row.rarity}</>,
    },
    {
      field: 'category',
      headerName: 'Category',
      className: 'w-[15%]',
      sortable: true,
      onSort: handleSort,
      renderCell: (row) => <>{row.category}</>,
    },
    {
      field: 'subcategory',
      headerName: 'SubCategory',
      className: 'w-[15%]',
      sortable: true,
      onSort: handleSort,
      renderCell: (row) => <>{row.subcategory}</>,
    },
    {
      field: 'sellPrice',
      headerName: 'Sell',
      className: 'w-[10%]',
      sortable: true,
      onSort: handleSort,
      renderCell: (row) => <>{row.sellPrice}</>,
    },
  ];

  return (
    <Table>
      <Table.Header>
        <ItemTableHeaderRow columns={columns} />
      </Table.Header>
      <Table.Body>
        <Suspense fallback={<LoadingRow />}>
          <ItemTableBodyRow columns={columns} />
        </Suspense>
      </Table.Body>
    </Table>
  );
};

const LoadingRow = () => (
  <Table.Row>
    <Table.Cell>
      <Loader />
    </Table.Cell>
  </Table.Row>
);

const NoDataRow = () => (
  <Table.Row>
    <Table.Cell className="fixed inset-0 flex items-center justify-center">
      <span>No Data</span>
    </Table.Cell>
  </Table.Row>
);

const ItemTableHeaderRow = ({ columns }: { columns: ItemColumns }) => {
  const headers: TableHeaderCellProps[] = columns.map((column) => {
    // properies to exclude from initial configuration, e.g. renderCell
    const header = (({ renderCell, ...rest }) => rest)(column);

    return header;
  });

  return (
    <Table.Row>
      {headers.map((header) => (
        <Table.HeaderCell key={header.field} {...header} />
      ))}
    </Table.Row>
  );
};

const ItemTableBodyRow = ({ columns }: { columns: ItemColumns }) => {
  const search = useSearch();
  const page = usePage();
  const sorts = useSorts();

  const { data: items } = useItemData({
    page,
    likes: [{ field: 'name.en', value: search }],
    sorts,
  });

  return (
    <>
      {items.data.length === 0 ? (
        <NoDataRow />
      ) : (
        items.data.map((item) => (
          <Table.Row key={item.id}>
            {columns.map((column) => {
              return (
                <Table.Cell key={column.field}>
                  {column.renderCell(item)}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))
      )}
    </>
  );
};
