import type { FilterFn, Row } from '@tanstack/react-table';

// biome-ignore lint/suspicious/noExplicitAny: type from tanstack table ColumnFiltering.d.ts
export const arrEqualsSome: FilterFn<any> = (
  row: Row<unknown>,
  columnId: string,
  filterValue: unknown,
) => {
  const cell = String(row.getValue(columnId) ?? '')
    .trim()
    .toLowerCase();

  if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0))
    return true;

  const terms = (Array.isArray(filterValue) ? filterValue : [filterValue]).map(
    (v) => String(v).trim().toLowerCase(),
  );

  return terms.some((t) => cell === t);
};
