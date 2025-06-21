import { Datagrid } from '@/components/datagrid';
import { useItemDatagridConfig } from '@/components/features/items/item-datagrid-config';
import { useItemData } from '@/hooks/flyff-service/use-item-data';
import { useApiOptions } from '@/hooks/providers/use-api-options';

export const ItemDatagrid = () => {
  const { state } = useApiOptions();
  const { columns } = useItemDatagridConfig();
  const { data: items } = useItemData(state);

  return <Datagrid columns={columns} rows={items.data} />;
};
