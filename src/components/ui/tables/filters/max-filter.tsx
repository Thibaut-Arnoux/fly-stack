import type { InputProps } from '@/components/ui/inputs/input';
import { NumberInput } from '@/components/ui/inputs/number-input';
import { useDataTableContext } from '@/components/ui/tables/data-table';

export const MaxFilter = ({
  column,
  min,
  max,
  ...props
}: { column: string } & InputProps) => {
  const { table } = useDataTableContext();
  const filterValue = table.getColumn(column)?.getFilterValue() as
    | [number, number]
    | undefined;
  const defaultValue = filterValue ? Math.max(...filterValue) : max;

  return (
    <NumberInput
      {...props}
      // re-mount the component to reset the input value, tricks for uncontrolled inputs
      key={`max-filter-${defaultValue}`}
      min={min}
      max={max}
      defaultValue={defaultValue}
      onBlur={(e) => {
        table.firstPage();
        table
          .getColumn(column)
          ?.setFilterValue((old: [number, number] | undefined) => [
            old?.[0] ?? min,
            Number(e.target.value),
          ]);
      }}
    />
  );
};
