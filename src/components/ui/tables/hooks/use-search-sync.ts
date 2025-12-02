import { useLocation, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { useDataTable } from '@/components/ui/tables/hooks/use-data-table';
import {
  fromColumnFiltersState,
  fromSortingState,
} from '@/components/ui/tables/utils/search';

const buildSearchParams = (
  prev: Record<string, unknown>,
  filterParams: Record<string, string>,
  sortString: string,
  filterColumns: string[],
): Record<string, unknown> => {
  const updated = { ...prev };

  for (const id of filterColumns) {
    if (!(id in filterParams) && id in updated) {
      delete updated[id];
    }
  }

  Object.assign(updated, filterParams);

  if (sortString) {
    updated.sort = sortString;
  } else if ('sort' in updated) {
    delete updated.sort;
  }

  return updated;
};

export const useSearchSync = (): void => {
  const { pathname } = useLocation();
  const navigate = useNavigate({
    from: pathname as never,
  });
  const { table } = useDataTable();
  const { sorting, columnFilters } = table.getState();

  const filterColumnsRef = useRef(
    table.options.columns
      .filter(
        (col) =>
          col.enableColumnFilter !== false && 'filterFn' in col && col.filterFn,
      )
      .map((col) => col.id)
      .filter((id): id is string => Boolean(id)),
  );

  const debouncedNavigate = useDebounceCallback(
    (
      filterParams: Record<string, string>,
      sortString: string,
      cols: string[],
    ) => {
      navigate({
        search: (prev: Record<string, unknown>) =>
          buildSearchParams(prev, filterParams, sortString, cols),
        replace: true,
      } as never);
    },
  );

  useEffect(() => {
    const sortString = fromSortingState(sorting);
    const filterParams = fromColumnFiltersState(columnFilters);

    debouncedNavigate(filterParams, sortString, filterColumnsRef.current);

    return () => {
      debouncedNavigate.cancel();
    };
  }, [sorting, columnFilters, debouncedNavigate]);
};
