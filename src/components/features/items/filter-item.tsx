import { FilterCategory } from '@/components/features/items/filter-category';
import { FilterLevel } from '@/components/features/items/filter-level';
import { FilterRarity } from '@/components/features/items/filter-rarity';
import { FilterSubcategory } from '@/components/features/items/filter-subcategory';
import { ResetFilter } from '@/components/ui/tables/filters/reset-filter';

export const FilterItem = () => {
  return (
    <ul className="menu rounded-box w-full">
      <div className="flex items-center justify-between">
        <h2 className="menu-title">Filter</h2>
        <ResetFilter className="btn-sm" />
      </div>
      <FilterLevel />
      <li>
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
        <details>
          <summary>Rarity</summary>
          <ul>
            <FilterRarity />
          </ul>
        </details>
      </li>
    </ul>
  );
};
