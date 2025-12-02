import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '@/components/ui/buttons/button';
import { cn } from '@/utils/cn';

export const IconButton = ({
  className,
  icon,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: ReactNode }) => {
  return (
    <Button className={cn('btn-square', className)} {...props}>
      {icon}
    </Button>
  );
};
