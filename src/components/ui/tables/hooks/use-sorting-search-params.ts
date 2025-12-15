import type { ColumnSort, SortingState } from '@tanstack/react-table';
import { createParser, useQueryState } from 'nuqs';

const parseAsSortingState = (sortColumns?: readonly string[]) => {
  return createParser<SortingState>({
    parse(queryValue) {
      return queryValue
        .split(',')
        .map((field) => field.trim())
        .filter((field) => field !== '')
        .map((field) => {
          const isDesc = field.startsWith('-');
          const fieldName = isDesc ? field.slice(1) : field;

          if (sortColumns && !sortColumns.includes(fieldName)) return null;

          return { id: fieldName, desc: isDesc };
        })
        .filter((sort): sort is ColumnSort => sort !== null);
    },
    serialize(value) {
      return value
        .map((sort) => (sort.desc ? `-${sort.id}` : sort.id))
        .join(',');
    },
  });
};

export const useSortingSearchParams = ({
  sortColumns,
}: {
  sortColumns?: readonly string[];
}) => {
  const [sorting, setSorting] = useQueryState(
    'sort',
    parseAsSortingState(sortColumns).withDefault([]),
  );

  const onSortingChange = (
    updater: SortingState | ((prev: SortingState) => SortingState),
  ) => {
    setSorting((prev) => {
      const newValue = typeof updater === 'function' ? updater(prev) : updater;

      return newValue.length === 0 ? null : newValue;
    });
  };

  return { sorting, onSortingChange };
};
