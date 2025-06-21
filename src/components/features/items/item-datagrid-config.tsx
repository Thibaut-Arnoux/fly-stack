import type { TableHeaderSort } from '@/components/table';
import { useApiOptions } from '@/hooks/providers/use-api-options';
import type { Item } from '@/schemas/item';
import type { ColumnsConfiguration } from '@/types/table';
import { getItemIconUrl } from '@/utils/image';

export const useItemDatagridConfig = () => {
  const { state, dispatch } = useApiOptions();
  const handleSort = (field: string, order: TableHeaderSort) => {
    if (order === null) {
      dispatch({ type: 'removeSort', field });
    } else {
      dispatch({ type: 'upsertSort', sort: { field, order } });
    }
  };

  const getSort = (field: string) => {
    const match = state.sorts.find((item) => item.field === field);
    return match ? (match.order ?? 'asc') : null;
  };

  const columns: ColumnsConfiguration<Item> = [
    {
      field: 'icon',
      headerName: 'Icon',
      className: 'w-[5%]',
      renderCell: (row) => <img src={getItemIconUrl(row.icon)} alt="icon" />,
    },
    {
      field: 'name.en',
      headerName: 'Name',
      className: 'w-[30%]',
      sortable: true,
      sort: getSort('name.en'),
      onSort: handleSort,
      renderCell: (row) => <>{row.name.en}</>,
    },
    {
      field: 'sex',
      headerName: 'Sex',
      className: 'w-[5%]',
      sortable: true,
      sort: getSort('sex'),
      onSort: handleSort,
      renderCell: (row) => <>{row.sex}</>,
    },
    {
      field: 'level',
      headerName: 'Level',
      className: 'w-[5%]',
      sortable: true,
      sort: getSort('level'),
      onSort: handleSort,
      renderCell: (row) => <>{row.level}</>,
    },
    {
      field: 'rarity',
      headerName: 'Rarity',
      className: 'w-[15%]',
      sortable: true,
      sort: getSort('rarity'),
      onSort: handleSort,
      renderCell: (row) => <>{row.rarity}</>,
    },
    {
      field: 'category',
      headerName: 'Category',
      className: 'w-[15%]',
      sortable: true,
      sort: getSort('category'),
      onSort: handleSort,
      renderCell: (row) => <>{row.category}</>,
    },
    {
      field: 'subcategory',
      headerName: 'SubCategory',
      className: 'w-[15%]',
      sortable: true,
      sort: getSort('subcategory'),
      onSort: handleSort,
      renderCell: (row) => <>{row.subcategory}</>,
    },
    {
      field: 'sellPrice',
      headerName: 'Sell',
      className: 'w-[10%]',
      sortable: true,
      sort: getSort('sellPrice'),
      onSort: handleSort,
      renderCell: (row) => <>{row.sellPrice}</>,
    },
  ];

  return { columns };
};
