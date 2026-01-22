import type { FocusEvent, InputHTMLAttributes } from 'react';
import { Input } from '@/components/ui/inputs/input';

export const NumberInput = ({
  min,
  max,
  onBlur,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (min && value < Number(min)) e.target.value = String(min);
    else if (max && value > Number(max)) e.target.value = String(max);

    onBlur?.(e);
  };

  return (
    <Input {...props} type="number" min={min} max={max} onBlur={handleBlur} />
  );
};
