import { Loader } from '@/components/loader';
import { Table } from '@/components/table';
import type { ColumnsConfiguration } from '@/types/table';

type DatagridProps<T extends object & { id: string }> = {
  columns: ColumnsConfiguration<T>;
  rows: T[];
};

export const Datagrid = <T extends object & { id: string }>({
  columns,
  rows,
}: DatagridProps<T>) => {
  return (
    <Table>
      <Table.Header>
        <TableHeaderRow columns={columns} />
      </Table.Header>
      <Table.Body>
        <TableBodyRow columns={columns} rows={rows} />
      </Table.Body>
    </Table>
  );
};

export const DatagridSkeleton = <T extends object & { id: string }>({
  columns,
}: Omit<DatagridProps<T>, 'rows'>) => {
  const skeletonColumns = columns.map((column) => {
    // not display sort arrow to only keep header's name
    const skeletonColumn = (({ defaultSort, ...rest }) => rest)(column);

    return skeletonColumn;
  });

  return (
    <Table>
      <Table.Header>
        <TableHeaderRow columns={skeletonColumns} />
      </Table.Header>
      <Table.Body>
        <LoadingRow />
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

const TableHeaderRow = <T extends object & { id: string }>({
  columns,
}: {
  columns: ColumnsConfiguration<T>;
}) => {
  const headers = columns.map((column) => {
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

const TableBodyRow = <T extends object & { id: string }>({
  columns,
  rows,
}: {
  columns: ColumnsConfiguration<T>;
  rows: T[];
}) => {
  return (
    <>
      {rows.length === 0 ? (
        <NoDataRow />
      ) : (
        rows.map((row) => (
          <Table.Row key={row.id}>
            {columns.map((column) => {
              return (
                <Table.Cell key={column.field}>
                  {column.renderCell(row)}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))
      )}
    </>
  );
};
