import { FilterLevel } from '@/components/features/items-electric/filter-level';
import { FilterCategory } from './filter-category';
import { FilterSubcategory } from './filter-subcategory';

export const FilterItemElectric = () => {
  return (
    <ul className="menu rounded-box w-full">
      <li className="w-full">
        <h2 className="menu-title">Filter</h2>
        <FilterLevel />
        <details>
          <summary>Category</summary>
          <ul>
            <FilterCategory />
          </ul>
        </details>
        <details>
          <summary>Subcategory</summary>
          <ul>
            <FilterSubcategory />
          </ul>
        </details>
      </li>
    </ul>
  );
};
