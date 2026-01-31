import { Coins, DollarSign, Gem, Package } from 'lucide-react';
import { memo, type ReactNode, useMemo } from 'react';
import { Section } from '@/components/ui/layouts/section';
import type { Item } from '@/schemas/item-schema';
import { formatPrice } from '@/utils/format';

interface ItemDetailsEconomyProps {
  item: Item;
}

export const ItemDetailsEconomy = memo(({ item }: ItemDetailsEconomyProps) => {
  const fields = useMemo(
    () =>
      [
        {
          icon: <Coins className="w-4 h-4" />,
          label: 'Buy Price',
          value: item.buy_price ? formatPrice(item.buy_price) : null,
          unit: 'Gold',
        },
        {
          icon: <DollarSign className="w-4 h-4" />,
          label: 'Sell Price',
          value: formatPrice(item.sell_price),
          unit: 'Gold',
        },
        {
          icon: <Package className="w-4 h-4" />,
          label: 'Stack Size',
          value: item.stack.toString(),
        },
        {
          icon: <Gem className="w-4 h-4" />,
          label: 'Transy',
          value: item.transy ? formatPrice(item.transy) : null,
        },
      ].filter((field) => field.value),
    [item.buy_price, item.sell_price, item.stack, item.transy],
  );

  return (
    <Section title="Economy">
      <div className="flex flex-wrap items-center gap-6">
        {fields.map((field) => (
          <ItemDetailsEconomyField
            key={field.label}
            icon={field.icon}
            label={field.label}
            value={field.value as string}
            unit={field.unit}
          />
        ))}
      </div>
    </Section>
  );
});

ItemDetailsEconomy.displayName = 'ItemDetailsEconomy';

interface ItemDetailsEconomyFieldProps {
  icon: ReactNode;
  label: string;
  value: string;
  unit?: string;
}

const ItemDetailsEconomyField = memo(
  ({ icon, label, value, unit }: ItemDetailsEconomyFieldProps) => (
    <div className="flex items-center gap-1 text-sm">
      <span className="text-base-content" aria-hidden="true">
        {icon}
      </span>
      <span className="text-base-content/50 font-medium">{label}:</span>
      <span className="text-base-content font-bold">
        {value}
        {unit && (
          <span className="text-xs font-normal ml-1 text-base-content/50">
            {unit}
          </span>
        )}
      </span>
    </div>
  ),
);

ItemDetailsEconomyField.displayName = 'ItemDetailsEconomyField';
