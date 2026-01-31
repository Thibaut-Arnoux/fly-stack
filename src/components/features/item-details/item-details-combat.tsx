import {
  Crosshair,
  Flame,
  Gauge,
  Hand,
  Shield,
  Swords,
  Target,
  Zap,
} from 'lucide-react';
import { memo, type ReactNode, useMemo } from 'react';
import { Badge } from '@/components/ui/data-display/badge';
import { Section } from '@/components/ui/layouts/section';
import type { Item } from '@/schemas/item-schema';
import { cn } from '@/utils/cn';

interface ItemDetailsCombatProps {
  item: Item;
}

const COLOR_CLASSES: Record<CombatColor, string> = {
  error: 'bg-error/10 border-error/20 text-error',
  info: 'bg-info/10 border-info/20 text-info',
  warning: 'bg-warning/10 border-warning/20 text-warning',
  primary: 'bg-primary/10 border-primary/20 text-primary',
  secondary: 'bg-secondary/10 border-secondary/20 text-secondary',
  accent: 'bg-accent/10 border-accent/20 text-accent',
};

const ATTACK_SPEED_MAP: Record<string, string> = {
  veryfast: 'Very Fast',
  fast: 'Fast',
  normal: 'Normal',
  slow: 'Slow',
  veryslow: 'Very Slow',
};

export const ItemDetailsCombat = memo(({ item }: ItemDetailsCombatProps) => {
  const hasAttack = item.min_attack || item.max_attack;
  const hasDefense = item.min_defense || item.max_defense;

  const shouldRender =
    hasAttack ||
    hasDefense ||
    item.attack_speed ||
    item.attack_range ||
    item.element_attack ||
    item.additional_skill_damage;

  const attackValue = useMemo(
    () => formatRange(item.min_attack, item.max_attack),
    [item.min_attack, item.max_attack],
  );

  const defenseValue = useMemo(
    () => formatRange(item.min_defense, item.max_defense),
    [item.min_defense, item.max_defense],
  );

  const attackSpeedValue = useMemo(
    () => (item.attack_speed ? formatAttackSpeed(item.attack_speed) : null),
    [item.attack_speed],
  );

  const attackSpeedSubValue = useMemo(
    () =>
      item.attack_speed_value
        ? `${item.attack_speed_value.toFixed(2)}`
        : undefined,
    [item.attack_speed_value],
  );

  if (!shouldRender) {
    return null;
  }

  return (
    <Section title="Combat Stats">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {hasAttack && (
          <CombatStatCard
            icon={<Swords className="w-4 h-4" />}
            label="Attack"
            value={attackValue}
            color="error"
            ariaLabel={`Attack: ${attackValue}`}
          />
        )}

        {hasDefense && (
          <CombatStatCard
            icon={<Shield className="w-4 h-4" />}
            label="Defense"
            value={defenseValue}
            color="info"
            ariaLabel={`Defense: ${defenseValue}`}
          />
        )}

        {item.attack_speed && attackSpeedValue && (
          <CombatStatCard
            icon={<Gauge className="w-4 h-4" />}
            label="Attack Speed"
            value={attackSpeedValue}
            subValue={attackSpeedSubValue}
            color="warning"
            ariaLabel={`Attack Speed: ${attackSpeedValue}${attackSpeedSubValue ? ` ${attackSpeedSubValue}` : ''}`}
          />
        )}

        {item.attack_range && (
          <CombatStatCard
            icon={<Crosshair className="w-4 h-4" />}
            label="Range"
            value={item.attack_range.toString()}
            color="primary"
            ariaLabel={`Range: ${item.attack_range}`}
          />
        )}

        {item.element_attack && (
          <CombatStatCard
            icon={<Flame className="w-4 h-4" />}
            label="Element Attack"
            value={`+${item.element_attack}`}
            color="secondary"
            ariaLabel={`Element Attack: +${item.element_attack}`}
          />
        )}

        {item.additional_skill_damage && (
          <CombatStatCard
            icon={<Zap className="w-4 h-4" />}
            label="Skill Damage"
            value={`+${item.additional_skill_damage}%`}
            color="accent"
            ariaLabel={`Skill Damage: +${item.additional_skill_damage}%`}
          />
        )}
      </div>

      {(item.two_handed || item.ultimate_convertible) && (
        <div className="flex flex-wrap gap-2 mt-3">
          {item.two_handed && (
            <Badge
              icon={<Hand className="w-4 h-4" />}
              variant="soft"
              color="warning"
              size="md"
            >
              Two-Handed
            </Badge>
          )}
          {item.ultimate_convertible && (
            <Badge
              icon={<Target className="w-4 h-4" />}
              variant="soft"
              color="secondary"
              size="md"
            >
              Ultimate Convertible
            </Badge>
          )}
        </div>
      )}
    </Section>
  );
});

ItemDetailsCombat.displayName = 'ItemDetailsCombat';

type CombatColor =
  | 'error'
  | 'info'
  | 'warning'
  | 'primary'
  | 'secondary'
  | 'accent';

interface CombatStatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  subValue?: string;
  color: CombatColor;
  ariaLabel: string;
}

const CombatStatCard = memo(
  ({ icon, label, value, subValue, color, ariaLabel }: CombatStatCardProps) => (
    <div
      className={cn(
        'rounded-field border p-3 flex flex-col gap-1',
        COLOR_CLASSES[color],
      )}
      role="group"
      aria-label={ariaLabel}
    >
      <div className="flex items-center gap-1.5 text-xs font-medium opacity-70">
        <span aria-hidden="true">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-lg font-bold text-base-content">
        {value}
        {subValue && (
          <span className="text-xs font-normal text-base-content/50 ml-1">
            ({subValue})
          </span>
        )}
      </div>
    </div>
  ),
);

CombatStatCard.displayName = 'CombatStatCard';

const formatRange = (
  min: number | null | undefined,
  max: number | null | undefined,
): string => {
  if (min && max) {
    return min === max ? min.toString() : `${min} - ${max}`;
  }
  return (min ?? max ?? 0).toString();
};

const formatAttackSpeed = (speed: string): string => {
  return ATTACK_SPEED_MAP[speed] ?? speed;
};
