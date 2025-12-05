import { useRef, useState } from 'react';
import type { InputProps } from '@/components/ui/inputs/input';
import { NumberInput } from '@/components/ui/inputs/number-input';
import { useDataTable } from '@/components/ui/tables/hooks/use-data-table';

export const MinFilter = ({
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
  const currentValue = filterValue ? Math.min(...filterValue) : min;
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
        const newMin = Number(e.target.value);
        const currentMax =
          (
            table.getColumn(column)?.getFilterValue() as
              | [number, number]
              | undefined
          )?.[1] ?? max;

        table
          .getColumn(column)
          ?.setFilterValue(() => [
            Math.min(newMin, currentMax),
            Math.max(newMin, currentMax),
          ]);
      }}
    />
  );
};
