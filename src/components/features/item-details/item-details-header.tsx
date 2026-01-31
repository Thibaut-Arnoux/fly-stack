import { Shield, Sparkles, TrendingUp } from 'lucide-react';
import { memo, useMemo } from 'react';
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

export const ItemDetailsHeader = memo(({ item }: ItemDetailsHeaderProps) => {
  const rarityClasses = RARITY_CLASSES[item.rarity];
  const itemName = item.name?.en ?? 'Unknown Item';
  const itemDescription = item.description?.en;

  const imageUrl = useMemo(
    () => `${import.meta.env.VITE_FLYFF_API_BASE_URL}/image/item/${item.icon}`,
    [item.icon],
  );

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
            src={imageUrl}
            alt={itemName}
            className="w-16 h-16 object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold text-base-content mb-1">
          {itemName}
        </h2>
        <p className="text-base-content/50 text-xs font-mono mb-3">
          #{item.item_id}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="ghost"
            icon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
            className={cn(
              'rounded text-xs text-base-content font-semibold uppercase',
              rarityClasses,
            )}
          >
            {item.rarity}
          </Badge>

          <Badge
            variant="ghost"
            icon={<TrendingUp className="w-4 h-4" aria-hidden="true" />}
            className="rounded text-xs text-base-content font-semibold uppercase"
          >
            LVL {item.level}
          </Badge>

          {item.element && (
            <Badge
              variant="ghost"
              icon={<Shield className="w-4 h-4" aria-hidden="true" />}
              className="rounded bg-info/20 text-base-content text-xs font-semibold uppercase"
            >
              {item.element}
            </Badge>
          )}
        </div>

        {itemDescription && (
          <p className="text-base-content/70 text-sm mt-2">{itemDescription}</p>
        )}
      </div>
    </div>
  );
});

ItemDetailsHeader.displayName = 'ItemDetailsHeader';
