import type { FilterFn, Row } from '@tanstack/react-table';

export const arrEqualsSome: FilterFn<unknown> = (
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

arrEqualsSome.autoRemove = (val: unknown) =>
  !val || (Array.isArray(val) && val.length === 0);
