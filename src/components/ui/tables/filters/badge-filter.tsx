import { Badge } from '@/components/ui/data-display/badge';
import { useDataTable } from '@/components/ui/tables/hooks/use-data-table';

export const BadgeFilter = ({ column }: { column?: string }) => {
  const { table } = useDataTable();

  const filters = table.getState().columnFilters;

  const getFilterCount = (value: unknown): number => {
    if (value === undefined) return 0;

    return Array.isArray(value) ? value.length : 1;
  };

  const count = column
    ? getFilterCount(filters.find((f) => f.id === column)?.value)
    : filters.reduce((sum, f) => sum + getFilterCount(f.value), 0);

  return <Badge color="neutral">{count}</Badge>;
};
