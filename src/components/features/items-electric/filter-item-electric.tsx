import { FilterLevelItemElectric } from '@/components/features/items-electric/filter-level-item-electric';
import { CheckboxListFilter } from '@/components/ui/tables/filters/checkbox-list-filter';
import { ItemCategoryEnumList } from '@/enums/item-category-enum';

export const FilterItemElectric = () => {
  return (
    <ul className="menu rounded-box w-full">
      <li className="w-full">
        <h2 className="menu-title">Filter</h2>
        <FilterLevelItemElectric />
        <details>
          <summary>Category</summary>
          <ul>
            <CheckboxListFilter data={ItemCategoryEnumList} column="category" />
          </ul>
        </details>
        <ul>
          <li>
            <a>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                Childssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
              </span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
};
