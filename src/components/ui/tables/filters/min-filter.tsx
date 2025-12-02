import type { InputProps } from '@/components/ui/inputs/input';
import { NumberInput } from '@/components/ui/inputs/number-input';
import { useDataTableContext } from '@/components/ui/tables/data-table';

export const MinFilter = ({
  column,
  min,
  max,
  ...props
}: { column: string } & InputProps) => {
  const { table } = useDataTableContext();
  const filterValue = table.getColumn(column)?.getFilterValue() as
    | [number, number]
    | undefined;
  const defaultValue = filterValue ? Math.min(...filterValue) : min;

  return (
    <NumberInput
      {...props}
      // re-mount the component to reset the input value, tricks for uncontrolled inputs
      key={`min-filter-${defaultValue}`}
      min={min}
      max={max}
      defaultValue={defaultValue}
      onBlur={(e) => {
        table.firstPage();
        table
          .getColumn(column)
          ?.setFilterValue((old: [number, number] | undefined) => [
            Number(e.target.value),
            old?.[1] ?? max,
          ]);
      }}
    />
  );
};
