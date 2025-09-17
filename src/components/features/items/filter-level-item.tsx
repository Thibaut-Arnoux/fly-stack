import { Input } from '@/components/ui/inputs/input';
import { NumberInput } from '@/components/ui/inputs/number-input';
import {
  useApiOptionsActions,
  useApiOptionsRanges,
} from '@/hooks/stores/use-api-options';
import { ITEM_CONSTANTS } from '@/utils/constants';

export const FilterLevelItem = () => {
  const ranges = useApiOptionsRanges();
  const range = ranges.find((range) => range.field === 'level') ?? {
    field: 'level',
    min: ITEM_CONSTANTS.LEVEL.MIN,
    max: ITEM_CONSTANTS.LEVEL.MAX,
  };
  const { upsertRange } = useApiOptionsActions();

  return (
    <div className="flex flex-row items-center">
      <span>Level</span>
      <NumberInput
        className="input input-sm"
        type="number"
        min={ITEM_CONSTANTS.LEVEL.MIN}
        max={ITEM_CONSTANTS.LEVEL.MAX}
        defaultValue={range.min}
        onBlur={(e) => {
          console.debug('NumberInput', e.target.value);

          upsertRange({
            field: 'level',
            min: Number(e.target.value),
            max: range.max,
          });
        }}
      />
      <span>-</span>
      <NumberInput
        className="input-sm"
        type="number"
        min={ITEM_CONSTANTS.LEVEL.MIN}
        max={ITEM_CONSTANTS.LEVEL.MAX}
        defaultValue={range.max}
        onBlur={(e) => {
          upsertRange({
            field: 'level',
            min: range.min,
            max: Number(e.target.value),
          });
        }}
      />
    </div>
  );
};
