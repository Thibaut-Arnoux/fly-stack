import { Loader } from '@/components/loader';
import { Table } from '@/components/table';
import type { ColumnsConfiguration } from '@/types/table';

type DatagridProps<T extends object & { id: string }> = {
  columns: ColumnsConfiguration<T>;
  rows: T[];
  loading?: boolean;
};

// TODO : add datagrid skeleton

export const Datagrid = <T extends object & { id: string }>({
  columns,
  rows,
  loading,
}: DatagridProps<T>) => {
  return (
    <Table>
      <Table.Header>
        <TableHeaderRow columns={columns} />
      </Table.Header>
      <Table.Body>
        {loading ? (
          <LoadingRow />
        ) : (
          <TableBodyRow columns={columns} rows={rows} />
        )}
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
}: { columns: ColumnsConfiguration<T> }) => {
  const headers = columns.map((column) => {
    // properies to exclude from initial configuration, e.g. renderCell
    const { renderCell, ...header } = column;

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
}: { columns: ColumnsConfiguration<T>; rows: T[] }) => {
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
