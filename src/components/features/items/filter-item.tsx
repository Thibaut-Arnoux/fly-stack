import { FilterCategory } from '@/components/features/items/filter-category';
import { FilterLevel } from '@/components/features/items/filter-level';
import { FilterRarity } from '@/components/features/items/filter-rarity';
import { FilterSubcategory } from '@/components/features/items/filter-subcategory';

export const FilterItem = () => {
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
