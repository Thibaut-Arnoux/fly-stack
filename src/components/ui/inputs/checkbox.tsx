import type { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export const Checkbox = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...props} className={cn('checkbox', className)} type="checkbox" />
  );
};
