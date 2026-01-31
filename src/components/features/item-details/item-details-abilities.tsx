import { Clock, Droplet, Package, Sparkles, Wand2, Zap } from 'lucide-react';
import { memo, type ReactNode, useMemo } from 'react';
import { Badge } from '@/components/ui/data-display/badge';
import { Section } from '@/components/ui/layouts/section';
import type { Ability, Item } from '@/schemas/item-schema';

interface ItemDetailsAbilitiesProps {
  item: Item;
}

export const ItemDetailsAbilities = memo(
  ({ item }: ItemDetailsAbilitiesProps) => {
    const hasAbilities = item.abilities && item.abilities.length > 0;
    const hasTriggerSkill = item.trigger_skill && item.trigger_skill.length > 0;
    const hasUsageInfo =
      item.cooldown || item.casting || item.consumed_mp || item.consumed_item;

    if (!hasAbilities && !hasTriggerSkill && !hasUsageInfo) {
      return null;
    }

    return (
      <Section title="Abilities & Effects">
        {hasAbilities && (
          <div className="space-y-2 mb-4">
            {item.abilities?.map((ability, index) => (
              <AbilityRow
                key={`ability-${index}-${ability.parameter}`}
                ability={ability}
              />
            ))}
          </div>
        )}

        {hasTriggerSkill && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Wand2 className="w-4 h-4 text-secondary" aria-hidden="true" />
              <span className="text-sm font-medium text-base-content/70">
                Trigger Skills
              </span>
            </div>
            <div className="space-y-2" role="list">
              {item.trigger_skill?.map((trigger, index) => (
                <div
                  key={`trigger-${index}-${trigger.skill}`}
                  role="listitem"
                  className="bg-secondary/10 border border-secondary/20 rounded-field p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-base-content">
                      Skill #{trigger.skill}
                    </span>
                    <Badge
                      variant="soft"
                      color={trigger.on_target ? 'info' : 'warning'}
                      size="sm"
                    >
                      {trigger.on_target ? 'On Target' : 'On Self'}
                    </Badge>
                  </div>
                  {item.trigger_skill_probability && (
                    <p className="text-xs text-base-content/60 mt-1">
                      {item.trigger_skill_probability}% chance on hit
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {hasUsageInfo && (
          <div className="grid grid-cols-2 gap-2">
            {item.cooldown && (
              <UsageInfoCard
                icon={<Clock className="w-4 h-4" />}
                label="Cooldown"
                value={formatDuration(item.cooldown)}
              />
            )}
            {item.casting && (
              <UsageInfoCard
                icon={<Zap className="w-4 h-4" />}
                label="Cast Time"
                value={formatDuration(item.casting)}
              />
            )}
            {item.consumed_mp && (
              <UsageInfoCard
                icon={<Droplet className="w-4 h-4" />}
                label="MP Cost"
                value={item.consumed_mp.toString()}
              />
            )}
            {item.consumed_item && (
              <UsageInfoCard
                icon={<Package className="w-4 h-4" />}
                label="Requires Item"
                value={formatConsumedItem(item.consumed_item)}
              />
            )}
          </div>
        )}
      </Section>
    );
  },
);

ItemDetailsAbilities.displayName = 'ItemDetailsAbilities';

interface AbilityRowProps {
  ability: Ability;
}

const AbilityRow = memo(({ ability }: AbilityRowProps) => {
  const value = useMemo(() => {
    const isPercent = ability.rate === true;
    const suffix = isPercent ? '%' : '';

    if (ability.add !== null && ability.add !== undefined) {
      const sign = ability.add >= 0 ? '+' : '';
      return `${sign}${ability.add}${suffix}`;
    }
    if (ability.set !== null && ability.set !== undefined) {
      return `=${ability.set}${suffix}`;
    }

    return null;
  }, [ability.add, ability.set, ability.rate]);

  const formattedName = useMemo(
    () => formatAbilityName(ability.parameter),
    [ability.parameter],
  );

  return (
    <div
      className="flex items-center justify-between bg-base-200/50 rounded-field px-3 py-2"
      role="listitem"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="text-sm text-base-content font-medium">
          {formattedName}
        </span>
      </div>
      {value && (
        <Badge variant="soft" color="primary" size="sm">
          {value}
        </Badge>
      )}
    </div>
  );
});

AbilityRow.displayName = 'AbilityRow';

interface UsageInfoCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const UsageInfoCard = memo(({ icon, label, value }: UsageInfoCardProps) => (
  <div
    className="flex items-center gap-2 bg-base-200/50 rounded-field px-3 py-2"
    role="group"
    aria-label={`${label}: ${value}`}
  >
    <span className="text-base-content/50" aria-hidden="true">
      {icon}
    </span>
    <div className="flex flex-col">
      <span className="text-xs text-base-content/50">{label}</span>
      <span className="text-sm font-semibold text-base-content">{value}</span>
    </div>
  </div>
));

UsageInfoCard.displayName = 'UsageInfoCard';

const formatAbilityName = (name: string): string => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0
    ? `${minutes}m ${remainingSeconds.toFixed(0)}s`
    : `${minutes}m`;
};

const formatConsumedItem = (item: string): string => {
  return item.charAt(0).toUpperCase() + item.slice(1);
};
