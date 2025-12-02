import type { InputProps } from '@/components/ui/inputs/input';
import { NumberInput } from '@/components/ui/inputs/number-input';
import { useDataTable } from '@/components/ui/tables/hooks/use-data-table';

export const MaxFilter = ({
  column,
  min: minProp,
  max: maxProp,
  ...props
}: { column: string } & InputProps) => {
  const { table } = useDataTable();
  const min = Number(minProp);
  const max = Number(maxProp);
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
        const newMax = Number(e.target.value);
        const currentMin =
          (
            table.getColumn(column)?.getFilterValue() as
              | [number, number]
              | undefined
          )?.[0] ?? min;

        table
          .getColumn(column)
          ?.setFilterValue(() => [
            Math.min(currentMin, newMax),
            Math.max(currentMin, newMax),
          ]);
      }}
    />
  );
};
