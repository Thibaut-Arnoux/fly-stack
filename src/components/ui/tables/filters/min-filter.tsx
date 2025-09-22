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

  return (
    <NumberInput
      {...props}
      min={min}
      max={max}
      defaultValue={min}
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
