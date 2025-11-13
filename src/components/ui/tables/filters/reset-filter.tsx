import { RotateCcw } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { useDataTableContext } from '@/components/ui/tables/data-table';

export const ResetFilter = ({
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { table } = useDataTableContext();

  return (
    <IconButton
      className={`btn-ghost ${className}`}
      {...props}
      icon={<RotateCcw size={16} />}
      onClick={() => {
        table.resetColumnFilters();
      }}
    />
  );
};
