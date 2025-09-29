import { Checkbox } from '@/components/ui/inputs/checkbox';
import { useDataTableContext } from '@/components/ui/tables/data-table';
import { splitIntoColumns } from '@/utils/array';

export const CheckboxListFilter = ({
  data,
  column,
  nbColumns = 2,
}: {
  data: string[];
  column: string;
  nbColumns?: number;
}) => {
  const { table } = useDataTableContext();

  const columns = splitIntoColumns(data, nbColumns);
  const selected =
    (table.getColumn(column)?.getFilterValue() as string[] | undefined) ?? [];

  const toggleItem = (item: string) => {
    table.firstPage();
    const newSelected = selected.includes(item)
      ? selected.filter((c) => c !== item)
      : [...selected, item];
    table.getColumn(column)?.setFilterValue(newSelected);
  };

  return (
    <div className="flex">
      {columns.map((col) => (
        <div key={col.id} className="flex-1 min-w-0">
          {col.items.map((item) => (
            <label
              key={item}
              htmlFor={item}
              className="flex items-center gap-2 p-1 cursor-pointer"
            >
              <Checkbox
                id={item}
                checked={selected.includes(item)}
                onChange={() => toggleItem(item)}
                className="checkbox-sm"
              />
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">{item}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};
