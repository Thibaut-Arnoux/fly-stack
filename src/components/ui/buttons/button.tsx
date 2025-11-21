import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export const Button = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type="button" className={cn('btn', className)} {...props}>
      {children}
    </button>
  );
};
