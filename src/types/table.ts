import type { TableHeaderCellProps } from '@/components/table';
import type { ReactNode } from 'react';

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? Key | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & (string | number)];

export type ColumnConfiguration<
  T extends object & { id: string },
  K extends NestedKeyOf<T> & string,
> = Omit<TableHeaderCellProps, 'field'> & {
  field: K;
  renderCell: (row: T) => ReactNode;
};
export type ColumnsConfiguration<T extends object & { id: string }> = Array<
  ColumnConfiguration<T, NestedKeyOf<T> & string>
>;
