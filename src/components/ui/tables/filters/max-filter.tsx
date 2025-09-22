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

  return (
    <NumberInput
      {...props}
      min={min}
      max={max}
      defaultValue={max}
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
