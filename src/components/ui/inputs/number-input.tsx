import { type FocusEvent, useState } from 'react';
import { Input, type InputProps } from '@/components/ui/inputs/input';

export const NumberInput = ({
  min,
  max,
  value,
  onBlur,
  ...props
}: InputProps) => {
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (min && value < Number(min)) e.target.value = String(min);
    else if (max && value > Number(max)) e.target.value = String(max);

    onBlur?.(e);
  };

  return <Input type="number" onBlur={handleBlur} {...props} />;
};
