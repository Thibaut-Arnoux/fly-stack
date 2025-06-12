import { Datagrid } from '@/components/datagrid';
import { useItemDatagridConfig } from '@/components/features/items/item-datagrid-config';

export const ItemDatagridSkeleton = () => {
  const { columns } = useItemDatagridConfig();

  const skeletonColumns = columns.map((column) => {
    // not display sort arrow to only keep header's name
    const { defaultSort, ...skeletonColumn } = column;

    return skeletonColumn;
  });

  return <Datagrid columns={skeletonColumns} rows={[]} loading />;
};
