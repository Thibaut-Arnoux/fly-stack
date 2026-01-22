import type { InputHTMLAttributes } from 'react';
import { useRef, useState } from 'react';
import { NumberInput } from '@/components/ui/inputs/number-input';
import { useDataTable } from '@/components/ui/tables/hooks/use-data-table';

interface MinFilterProps extends InputHTMLAttributes<HTMLInputElement> {
  column: string;
}

export const MinFilter = ({
  column,
  min: minProp,
  max: maxProp,
  ...props
}: MinFilterProps) => {
  const { table } = useDataTable();
  const min = Number(minProp);
  const max = Number(maxProp);
  const filterValue = table.getColumn(column)?.getFilterValue() as
    | [number, number]
    | undefined;
  const currentValue = filterValue ? Math.min(...filterValue) : min;
  const [localValue, setLocalValue] = useState(String(currentValue));
  const prevFilterRef = useRef(currentValue);

  // sync mechanism from external source like 'reset filter'
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
        const newMin = Number(e.target.value);
        const filterValue = table.getColumn(column)?.getFilterValue() as
          | [number, number]
          | undefined;
        const currentMax = filterValue ? Math.max(...filterValue) : max;
        const finalMin = Math.min(newMin, currentMax);

        table
          .getColumn(column)
          ?.setFilterValue(() => [finalMin, Math.max(finalMin, currentMax)]);
        table.firstPage();
        setLocalValue(String(finalMin));
      }}
    />
  );
};
