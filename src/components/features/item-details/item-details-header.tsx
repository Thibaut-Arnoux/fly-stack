import { Shield, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/data-display/badge';
import { type ItemRarity, ItemRarityEnum } from '@/enums/item-rarity-enum';
import type { Item } from '@/schemas/item-schema';
import { cn } from '@/utils/cn';

const RARITY_CLASSES: Record<ItemRarity, string> = {
  [ItemRarityEnum.COMMON]: 'bg-rarity-common',
  [ItemRarityEnum.UNCOMMON]: 'bg-rarity-uncommon',
  [ItemRarityEnum.RARE]: 'bg-rarity-rare',
  [ItemRarityEnum.VERYRARE]: 'bg-rarity-very-rare',
  [ItemRarityEnum.UNIQUE]: 'bg-rarity-unique',
  [ItemRarityEnum.ULTIMATE]: 'bg-rarity-ultimate',
};

interface ItemDetailsHeaderProps {
  item: Item;
}

export const ItemDetailsHeader = ({ item }: ItemDetailsHeaderProps) => {
  const rarityClasses = RARITY_CLASSES[item.rarity];

  return (
    <div className="flex items-start gap-4">
      <div className="relative flex-shrink-0">
        <div
          className={cn(
            'rounded-field p-3 border-2 border-base-300',
            rarityClasses,
          )}
        >
          <img
            src={`${import.meta.env.VITE_FLYFF_API_BASE_URL}/image/item/${item.icon}`}
            alt={item.name?.en ?? 'Item'}
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold text-base-content mb-1">
          {item.name?.en ?? 'Unknown Item'}
        </h2>
        <p className="text-base-content/50 text-xs font-mono mb-3">
          #{item.item_id}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="ghost"
            icon={<Sparkles className="w-4 h-4" />}
            className={cn(
              'rounded text-xs text-base-content font-semibold uppercase',
              rarityClasses,
            )}
          >
            {item.rarity}
          </Badge>

          <Badge
            variant="ghost"
            icon={<TrendingUp className="w-4 h-4" />}
            className="rounded text-xs text-base-content font-semibold uppercase"
          >
            LVL {item.level}
          </Badge>

          {item.element && item.element !== 'none' && (
            <Badge
              variant="ghost"
              icon={<Shield className="w-4 h-4" />}
              className="rounded bg-info/20 text-base-content text-xs font-semibold uppercase"
            >
              {item.element}
            </Badge>
          )}
        </div>

        {item.description?.en && item.description.en !== 'null' && (
          <p className="text-base-content/70 text-sm mt-2">
            {item.description.en}
          </p>
        )}
      </div>
    </div>
  );
};
