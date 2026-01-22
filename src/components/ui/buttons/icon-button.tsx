import type { ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/buttons/button';

interface IconButtonProps extends ButtonProps {
  icon: ReactNode;
}

export const IconButton = ({
  icon,
  shape = 'square',
  ...props
}: IconButtonProps) => {
  return (
    <Button shape={shape} {...props}>
      {icon}
    </Button>
  );
};
