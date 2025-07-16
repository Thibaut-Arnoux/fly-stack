import type { ReactNode } from 'react';
import { Loader } from '@/components/ui/loaders/loader';
import type { TableHeaderCellProps } from '@/components/ui/tables/table';
import { Table } from '@/components/ui/tables/table';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? Key | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & (string | number)];

type ColumnConfiguration<
  T extends object & { id: string },
  K extends NestedKeyOf<T> & string,
> = Omit<TableHeaderCellProps, 'field'> & {
  field: K;
  renderCell: (row: T) => ReactNode;
};

export type ColumnsConfiguration<T extends object & { id: string }> = Array<
  ColumnConfiguration<T, NestedKeyOf<T> & string>
>;

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
}: Pick<DatagridProps<T>, 'columns'>) => {
  return (
    <Table>
      <Table.Header>
        <TableHeaderRow columns={columns} />
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
    <Table.Cell className="fixed inset-0 flex items-center justify-center pointer-events-none">
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
