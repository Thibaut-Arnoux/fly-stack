import type { ColumnDef } from '@tanstack/react-table';

/**
 * Extract column IDs where a specific enable property is not false
 */
export const getEnabledColumnIds = <TData>(
  // biome-ignore lint/suspicious/noExplicitAny: TanStack Table uses complex union types for columns
  columns: ColumnDef<TData, any>[],
  enableKey: 'enableColumnFilter' | 'enableSorting',
): readonly string[] => {
  return columns
    .filter((col) => col[enableKey] !== false)
    .map((col) => col.id)
    .filter((id): id is string => Boolean(id));
};
