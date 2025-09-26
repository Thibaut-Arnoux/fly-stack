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

  const toggleCategory = (cat: string) => {
    table.firstPage();
    const newSelected = selected.includes(cat)
      ? selected.filter((c) => c !== cat)
      : [...selected, cat];
    table.getColumn(column)?.setFilterValue(newSelected);
  };

  return (
    <div className="flex">
      {columns.map((col) => (
        <div key={col.id} className="flex-1">
          {col.items.map((cat) => (
            <label
              key={cat}
              htmlFor={cat}
              className="flex items-center gap-2 p-1 cursor-pointer"
            >
              <Checkbox
                id={cat}
                checked={selected.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="checkbox-sm"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};
