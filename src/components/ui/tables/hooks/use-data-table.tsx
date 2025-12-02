import { useContext } from 'react';
import {
  DataTableContext,
  type DataTableContextType,
} from '@/components/ui/tables/data-table';

export const useDataTable = <TData,>() => {
  const ctx = useContext(
    DataTableContext,
  ) as DataTableContextType<TData> | null;

  if (!ctx)
    throw new Error('useDataTable must be used inside <DataTableProvider>');

  return ctx;
};
