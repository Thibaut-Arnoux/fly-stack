import { Datagrid } from '@/components/datagrid';
import { useItemDatagridConfig } from '@/components/features/items/item-datagrid-config';
import { useItemData } from '@/hooks/flyff-service/use-item-data';
import { usePage, useApiOptionsLikes, useSorts } from '@/hooks/stores/use-api-options';

export const ItemDatagrid = () => {
  const likes = useApiOptionsLikes();
  const page = usePage();
  const sorts = useSorts();
  const { columns } = useItemDatagridConfig();
  const { data: items } = useItemData({
    page,
    likes,
    sorts,
  });

  return <Datagrid columns={columns} rows={items.data} />;
};
