import { MaxFilter } from '@/components/ui/tables/filters/max-filter';
import { MinFilter } from '@/components/ui/tables/filters/min-filter';
import { ITEM_CONSTANTS } from '@/utils/constants';

export const FilterLevel = () => {
  return (
    <div className="flex flex-row items-center gap-2 px-3 py-1">
      <span>Level</span>
      <MinFilter
        column="level"
        className="input-sm"
        min={ITEM_CONSTANTS.LEVEL.MIN}
        max={ITEM_CONSTANTS.LEVEL.MAX}
      />
      <span>-</span>
      <MaxFilter
        column="level"
        className="input-sm"
        min={ITEM_CONSTANTS.LEVEL.MIN}
        max={ITEM_CONSTANTS.LEVEL.MAX}
      />
    </div>
  );
};
