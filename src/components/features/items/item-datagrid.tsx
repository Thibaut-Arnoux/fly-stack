import { Datagrid } from '@/components/datagrid';
import { useItemDatagridConfig } from '@/components/features/items/item-datagrid-config';
import { useItemData } from '@/hooks/flyff-service/use-item-data';
import { usePage, useSearch, useSorts } from '@/hooks/stores/use-item-store';

export const ItemDatagrid = () => {
  const search = useSearch();
  const page = usePage();
  const sorts = useSorts();
  const { columns } = useItemDatagridConfig();
  const { data: items } = useItemData({
    page,
    likes: [{ field: 'name.en', value: search }],
    sorts,
  });

  return <Datagrid columns={columns} rows={items.data} />;
};
