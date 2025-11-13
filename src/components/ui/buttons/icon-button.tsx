import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '@/components/ui/buttons/button';

export const IconButton = ({
  className = '',
  icon,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: ReactNode }) => {
  return (
    <Button className={`btn-square ${className}`} {...props}>
      {icon}
    </Button>
  );
};
