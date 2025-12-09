import type { ColumnFilter, ColumnFiltersState } from '@tanstack/react-table';
import { createParser, useQueryStates } from 'nuqs';

const parseAsColumnFilter = (id: string, isArrayFilter: boolean) => {
  return createParser<ColumnFilter>({
    parse(queryValue) {
      if (!queryValue || queryValue.trim() === '') {
        return { id, value: isArrayFilter ? [] : '' };
      }

      const parsedValue = queryValue
        .split(',')
        .map((v) => v.trim())
        .filter((v) => v !== '');

      return {
        id,
        value: isArrayFilter ? parsedValue : (parsedValue[0] ?? ''),
      };
    },
    serialize(filter) {
      return Array.isArray(filter.value)
        ? filter.value.join(',')
        : String(filter.value);
    },
  });
};

const stateToColumnFilters = (
  state: Record<string, ColumnFilter | null>,
): ColumnFiltersState => {
  return Object.values(state).filter((f): f is ColumnFilter => f !== null);
};

export const useFilteringSearchParams = ({
  filterColumns,
  arrayFilterColumns = [],
}: {
  filterColumns: readonly string[];
  arrayFilterColumns?: readonly string[];
}) => {
  const arrayFilterColumnsSet = new Set(arrayFilterColumns);

  const filterParsers = Object.fromEntries(
    filterColumns.map((col) => [
      col,
      parseAsColumnFilter(col, arrayFilterColumnsSet.has(col)),
    ]),
  );

  const [state, setState] = useQueryStates(filterParsers);

  const columnFilters = stateToColumnFilters(state);

  const onColumnFiltersChange = (
    updater:
      | ColumnFiltersState
      | ((prev: ColumnFiltersState) => ColumnFiltersState),
  ) => {
    setState((prev) => {
      const currentFilters = stateToColumnFilters(prev);

      const newFilters =
        typeof updater === 'function' ? updater(currentFilters) : updater;

      return Object.fromEntries(
        filterColumns.map((col) => [
          col,
          newFilters.find((f) => f.id === col) ?? null,
        ]),
      );
    });
  };

  return { columnFilters, onColumnFiltersChange };
};
