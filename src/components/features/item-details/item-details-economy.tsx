import { Coins, DollarSign, Package } from 'lucide-react';
import type { ReactNode } from 'react';
import { Section } from '@/components/ui/layouts/section';
import type { Item } from '@/schemas/item-schema';
import { formatPrice } from '@/utils/format';

interface ItemDetailsEconomyProps {
  item: Item;
}

export const ItemDetailsEconomy = ({ item }: ItemDetailsEconomyProps) => {
  const fields = [
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
  ];

  return (
    <Section title="Economy">
      <div className="flex flex-wrap items-center gap-6">
        {fields.map(
          (field) =>
            field.value && (
              <ItemDetailsEconomyField
                key={field.label}
                icon={field.icon}
                label={field.label}
                value={field.value}
                unit={field.unit}
              />
            ),
        )}
      </div>
    </Section>
  );
};

interface ItemDetailsEconomyFieldProps {
  icon: ReactNode;
  label: string;
  value: string;
  unit?: string;
}

const ItemDetailsEconomyField = ({
  icon,
  label,
  value,
  unit,
}: ItemDetailsEconomyFieldProps) => (
  <div className="flex items-center gap-1 text-sm">
    <span className="text-base-content">{icon}</span>
    <span className="text-base-content/50 font-medium">{label} :</span>
    <span className="text-base-content font-bold">
      {value}
      {unit && (
        <span className="text-xs font-normal ml-1 text-base-content/50">
          {unit}
        </span>
      )}
    </span>
  </div>
);
