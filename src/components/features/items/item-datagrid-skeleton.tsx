import { DatagridSkeleton } from '@/components/datagrid';
import { useItemDatagridConfig } from '@/components/features/items/item-datagrid-config';

export const ItemDatagridSkeleton = () => {
  const { columns } = useItemDatagridConfig();

  return <DatagridSkeleton columns={columns} />;
};
