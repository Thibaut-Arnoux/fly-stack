import {
  ArrowUpCircle,
  Check,
  Clock,
  Fish,
  Gift,
  Heart,
  MapPin,
  Plane,
  Scissors,
  Shuffle,
  Users,
  X,
} from 'lucide-react';
import { memo, type ReactNode, useMemo } from 'react';
import { Badge } from '@/components/ui/data-display/badge';
import { Section } from '@/components/ui/layouts/section';
import type {
  Content,
  Dismantle,
  Item,
  PossibleRandomStat,
  UpgradeLevel,
} from '@/schemas/item-schema';

interface ItemDetailsExtraProps {
  item: Item;
}

export const ItemDetailsExtra = memo(({ item }: ItemDetailsExtraProps) => {
  const hasContents = item.contents && item.contents.length > 0;
  const hasDismantle = item.dismantle && item.dismantle.length > 0;
  const hasRandomStats =
    item.possible_random_stats && item.possible_random_stats.length > 0;
  const hasUpgradeLevels =
    item.upgrade_levels && item.upgrade_levels.length > 0;
  const hasOtherInfo =
    item.duration ||
    item.flight_speed ||
    item.guild_contribution ||
    item.minimum_target_item_level ||
    item.couple_bank_slots ||
    item.couple_cheers ||
    item.couple_teleports ||
    item.fishing_large_chance ||
    item.gathering_chance;
  const hasLocation = item.location || item.blinkwing_target;

  if (
    !hasContents &&
    !hasDismantle &&
    !hasRandomStats &&
    !hasUpgradeLevels &&
    !hasOtherInfo &&
    !hasLocation
  ) {
    return null;
  }

  return (
    <>
      {hasContents && (
        <Section title="Contents">
          <div className="space-y-1" role="list">
            {item.contents?.map((content, index) => (
              <ContentRow
                key={`content-${index}-${content.item}`}
                content={content}
              />
            ))}
          </div>
        </Section>
      )}

      {hasDismantle && (
        <Section title="Dismantle">
          <div className="space-y-2" role="list">
            {item.dismantle?.map((dismantle, index) => (
              <DismantleRow
                key={`dismantle-${index}-${dismantle.item}`}
                dismantle={dismantle}
              />
            ))}
          </div>
        </Section>
      )}

      {hasRandomStats && (
        <Section title="Possible Random Stats">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
            {item.possible_random_stats?.map((stat, index) => (
              <RandomStatRow
                key={`stat-${index}-${stat.parameter}`}
                stat={stat}
              />
            ))}
          </div>
        </Section>
      )}

      {hasUpgradeLevels && (
        <Section title="Upgrade Levels">
          <div className="space-y-3" role="list">
            {item.upgrade_levels?.map((upgrade) => (
              <UpgradeLevelCard
                key={`upgrade-${upgrade.upgrade_level}`}
                upgrade={upgrade}
              />
            ))}
          </div>
        </Section>
      )}

      {hasLocation && (
        <Section title="Location">
          <div className="space-y-2">
            {item.location && (
              <LocationInfo label="Item Location" location={item.location} />
            )}
            {item.blinkwing_target && (
              <LocationInfo
                label="Blinkwing Target"
                location={item.blinkwing_target}
              />
            )}
          </div>
        </Section>
      )}

      {hasOtherInfo && (
        <Section title="Additional Info">
          <div className="flex flex-wrap gap-4">
            {item.duration && (
              <InfoItem
                icon={<Clock className="w-4 h-4" />}
                label="Duration"
                value={formatDuration(item.duration)}
              />
            )}
            {item.flight_speed && (
              <InfoItem
                icon={<Plane className="w-4 h-4" />}
                label="Flight Speed"
                value={`${item.flight_speed}%`}
              />
            )}
            {item.guild_contribution && (
              <InfoItem
                icon={<Users className="w-4 h-4" />}
                label="Guild Contribution"
                value={item.guild_contribution.toLocaleString()}
              />
            )}
            {item.minimum_target_item_level && (
              <InfoItem
                icon={<Gift className="w-4 h-4" />}
                label="Min Target Level"
                value={`Lv. ${item.minimum_target_item_level}`}
              />
            )}
            {item.couple_bank_slots && (
              <InfoItem
                icon={<Heart className="w-4 h-4" />}
                label="Couple Bank Slots"
                value={`+${item.couple_bank_slots}`}
              />
            )}
            {item.couple_cheers && (
              <InfoItem
                icon={<Heart className="w-4 h-4" />}
                label="Couple Cheers"
                value={`+${item.couple_cheers}`}
              />
            )}
            {item.couple_teleports && (
              <InfoItem
                icon={<Heart className="w-4 h-4" />}
                label="Couple Teleports"
                value={`+${item.couple_teleports}`}
              />
            )}
            {item.fishing_large_chance && (
              <InfoItem
                icon={<Fish className="w-4 h-4" />}
                label="Large Fish Chance"
                value={`+${item.fishing_large_chance}%`}
              />
            )}
            {item.gathering_chance && (
              <InfoItem
                icon={<Gift className="w-4 h-4" />}
                label="Gathering Chance"
                value={`+${item.gathering_chance}%`}
              />
            )}
          </div>
        </Section>
      )}
    </>
  );
});

ItemDetailsExtra.displayName = 'ItemDetailsExtra';

interface ContentRowProps {
  content: Content;
}

const ContentRow = memo(({ content }: ContentRowProps) => (
  <div
    className="flex items-center justify-between bg-base-200/50 rounded-field px-3 py-2"
    role="listitem"
  >
    <div className="flex items-center gap-2">
      <Gift className="w-4 h-4 text-success" aria-hidden="true" />
      <span className="text-sm text-base-content">Item #{content.item}</span>
    </div>
    <Badge variant="soft" color="success" size="sm">
      x{content.count}
    </Badge>
  </div>
));

ContentRow.displayName = 'ContentRow';

interface DismantleRowProps {
  dismantle: Dismantle;
}

const DismantleRow = memo(({ dismantle }: DismantleRowProps) => (
  <div className="bg-base-200/50 rounded-field px-3 py-2" role="listitem">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Scissors className="w-4 h-4 text-warning" aria-hidden="true" />
        <span className="text-sm text-base-content font-medium">
          {dismantle.item ? `Item #${dismantle.item}` : 'Dismantle Result'}
        </span>
      </div>
      <Badge variant="soft" color="warning" size="sm">
        x{dismantle.count}
      </Badge>
    </div>
    <div className="flex flex-wrap gap-2">
      <PreserveBadge label="Piercing" preserved={dismantle.save_piercing} />
      <PreserveBadge label="Element" preserved={dismantle.save_element} />
      <PreserveBadge label="Upgrade" preserved={dismantle.save_upgrade} />
      {dismantle.input_upgrade_level && (
        <Badge variant="ghost" size="sm">
          Req. +{dismantle.input_upgrade_level}
        </Badge>
      )}
    </div>
  </div>
));

DismantleRow.displayName = 'DismantleRow';

interface PreserveBadgeProps {
  label: string;
  preserved: boolean;
}

const PreserveBadge = memo(({ label, preserved }: PreserveBadgeProps) => (
  <Badge
    variant="ghost"
    size="sm"
    icon={
      preserved ? (
        <Check className="w-3 h-3 text-success" />
      ) : (
        <X className="w-3 h-3 text-error" />
      )
    }
    className={preserved ? 'text-success' : 'text-base-content/50'}
  >
    {label}
  </Badge>
));

PreserveBadge.displayName = 'PreserveBadge';

interface RandomStatRowProps {
  stat: PossibleRandomStat;
}

const RandomStatRow = memo(({ stat }: RandomStatRowProps) => {
  const suffix = stat.rate ? '%' : '';
  const formattedName = useMemo(
    () => formatStatName(stat.parameter),
    [stat.parameter],
  );

  return (
    <div
      className="flex items-center justify-between bg-base-200/50 rounded-field px-3 py-2"
      role="listitem"
    >
      <div className="flex items-center gap-2">
        <Shuffle className="w-4 h-4 text-accent" aria-hidden="true" />
        <span className="text-sm text-base-content">{formattedName}</span>
      </div>
      <span className="text-sm font-mono text-base-content/70">
        {stat.add}
        {suffix} - {stat.add_max}
        {suffix}
      </span>
    </div>
  );
});

RandomStatRow.displayName = 'RandomStatRow';

interface UpgradeLevelCardProps {
  upgrade: UpgradeLevel;
}

const UpgradeLevelCard = memo(({ upgrade }: UpgradeLevelCardProps) => (
  <div className="bg-base-200/50 rounded-field p-3" role="listitem">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <ArrowUpCircle className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="font-semibold text-base-content">
          +{upgrade.upgrade_level}
        </span>
      </div>
      <Badge variant="ghost" size="sm">
        Req. Lv. {upgrade.required_level}
      </Badge>
    </div>
    {upgrade.abilities.length > 0 && (
      <div className="space-y-1 mt-2">
        {upgrade.abilities.map((ability, index) => {
          const isPercent = ability.rate === true;
          const suffix = isPercent ? '%' : '';
          let value = '';
          if (ability.add !== null && ability.add !== undefined) {
            const sign = ability.add >= 0 ? '+' : '';
            value = `${sign}${ability.add}${suffix}`;
          } else if (ability.set !== null && ability.set !== undefined) {
            value = `=${ability.set}${suffix}`;
          }

          return (
            <div
              key={`upgrade-ability-${index}-${ability.parameter}`}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-base-content/70">
                {formatStatName(ability.parameter)}
              </span>
              <span className="font-medium text-primary">{value}</span>
            </div>
          );
        })}
      </div>
    )}
  </div>
));

UpgradeLevelCard.displayName = 'UpgradeLevelCard';

interface LocationInfoProps {
  label: string;
  location: { world: number; x: number; y: number; z: number };
}

const LocationInfo = memo(({ label, location }: LocationInfoProps) => (
  <div
    className="flex items-center gap-2 bg-base-200/50 rounded-field px-3 py-2"
    role="group"
    aria-label={`${label}: World ${location.world}`}
  >
    <MapPin className="w-4 h-4 text-info" aria-hidden="true" />
    <span className="text-sm text-base-content/70">{label}:</span>
    <span className="text-sm font-mono text-base-content">
      World {location.world} ({location.x.toFixed(0)}, {location.y.toFixed(0)},{' '}
      {location.z.toFixed(0)})
    </span>
  </div>
));

LocationInfo.displayName = 'LocationInfo';

interface InfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const InfoItem = memo(({ icon, label, value }: InfoItemProps) => (
  <div className="flex items-center gap-2 text-sm">
    <span className="text-base-content/50" aria-hidden="true">
      {icon}
    </span>
    <span className="text-base-content/70">{label}:</span>
    <span className="font-semibold text-base-content">{value}</span>
  </div>
));

InfoItem.displayName = 'InfoItem';

const formatStatName = (name: string): string => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
};
