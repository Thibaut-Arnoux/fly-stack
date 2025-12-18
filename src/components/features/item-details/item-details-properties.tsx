import {
  Check,
  Coins,
  Sparkles,
  Star,
  Timer,
  Trash2,
  TrendingUp,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/data-display/badge';
import { Section } from '@/components/ui/layouts/section';
import type { Item } from '@/schemas/item-schema';
import { cn } from '@/utils/cn';

interface ItemDetailsPropertiesProps {
  item: Item;
}

export const ItemDetailsProperties = ({ item }: ItemDetailsPropertiesProps) => {
  const badges = [
    {
      label: 'Consumable',
      active: item.consumable,
      icon: <Coins className="w-4 h-4" />,
    },
    {
      label: 'Premium',
      active: item.premium,
      icon: <Star className="w-4 h-4" />,
    },
    {
      label: 'Shining',
      active: item.shining,
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      label: 'Tradable',
      active: item.tradable,
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      label: 'Deletable',
      active: item.deletable,
      icon: <Trash2 className="w-4 h-4" />,
    },
    {
      label: 'Real Time Duration',
      active: item.duration_real_time,
      icon: <Timer className="w-4 h-4" />,
    },
  ];

  return (
    <Section title="Properties">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {badges.map((badge) => (
          <ItemDetailsPropertyBadge
            key={badge.label}
            label={badge.label}
            active={badge.active}
            icon={badge.icon}
          />
        ))}
      </div>
    </Section>
  );
};

interface ItemDetailsPropertyBadgeProps {
  label: string;
  active: boolean;
  icon: ReactNode;
}

const ItemDetailsPropertyBadge = ({
  label,
  active,
  icon,
}: ItemDetailsPropertyBadgeProps) => {
  const statusIcon = active ? (
    <Check className="w-4 h-4" />
  ) : (
    <X className="w-4 h-4 opacity-50" />
  );

  const badgeIcon = (
    <span className="flex items-center gap-1.5">
      {statusIcon}
      <span className="opacity-70">{icon}</span>
    </span>
  );

  return (
    <Badge
      icon={badgeIcon}
      color={active ? 'success' : undefined}
      variant={active ? 'soft' : 'ghost'}
      size="md"
      className={cn(!active && 'opacity-50')}
    >
      {label}
    </Badge>
  );
};
