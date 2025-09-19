import { FilterLevelItem } from '@/components/features/items/filter-level-item';

export const FilterItem = () => {
  return (
    <ul className="menu rounded-box w-full">
      <li className="w-full">
        <h2 className="menu-title">Filter</h2>
        <FilterLevelItem />
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
