import { useRef, useState } from 'react';
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
  const currentValue = filterValue ? Math.max(...filterValue) : max;
  const [localValue, setLocalValue] = useState(String(currentValue));
  const prevFilterRef = useRef(currentValue);

  if (prevFilterRef.current !== currentValue) {
    setLocalValue(String(currentValue));
  }
  prevFilterRef.current = currentValue;

  return (
    <NumberInput
      {...props}
      min={min}
      max={max}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
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
