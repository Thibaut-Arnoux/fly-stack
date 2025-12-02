import { useLocation, useNavigate } from '@tanstack/react-router';
import { RotateCcw } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { useDataTable } from '@/components/ui/tables/hooks/use-data-table';
import { cn } from '@/utils/cn';

export const ResetFilter = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { table } = useDataTable();
  const { pathname } = useLocation();
  const navigate = useNavigate({ from: pathname as never });

  return (
    <IconButton
      className={cn('btn-ghost', className)}
      {...props}
      icon={<RotateCcw size={16} />}
      onClick={() => {
        table.resetColumnFilters();
        table.firstPage();
        navigate({ search: () => ({}) } as never);
      }}
    />
  );
};
