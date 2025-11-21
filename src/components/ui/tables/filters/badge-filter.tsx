import { Badge } from '@/components/ui/badge';
import { useDataTableContext } from '@/components/ui/tables/data-table';

export const BadgeFilter = ({ column }: { column?: string }) => {
  const { table } = useDataTableContext();

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
