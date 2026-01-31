import { MapPin } from 'lucide-react';
import { memo } from 'react';
import { Section } from '@/components/ui/layouts/section';
import type { Item } from '@/schemas/item-schema';

interface ItemDetailsSpawnsProps {
  item: Item;
}

export const ItemDetailsSpawns = memo(({ item }: ItemDetailsSpawnsProps) => {
  if (!item.spawns || item.spawns.length === 0) {
    return null;
  }

  return (
    <Section title="Spawn Locations">
      <div className="space-y-2" role="list">
        {item.spawns.map((spawn, index) => (
          <ItemDetailsSpawn
            key={`spawn-${index}-${spawn.world}-${spawn.continent}`}
            spawn={spawn}
          />
        ))}
      </div>
    </Section>
  );
});

ItemDetailsSpawns.displayName = 'ItemDetailsSpawns';

interface SpawnProps {
  spawn: Item['spawns'][number];
}

const ItemDetailsSpawn = memo(({ spawn }: SpawnProps) => {
  return (
    <div
      className="flex items-start gap-3 p-3 bg-base-200/50 rounded-lg border border-base-300"
      role="listitem"
    >
      <MapPin
        className="w-4 h-4 text-base-content/50 flex-shrink-0 mt-0.5"
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-base-content">
            World {spawn.world}
          </span>
          {spawn.continent !== undefined && (
            <span className="text-xs px-2 py-0.5 bg-base-300 rounded text-base-content/60">
              Continent {spawn.continent}
            </span>
          )}
        </div>
        <div className="text-xs text-base-content/50">
          ({spawn.left}, {spawn.top}) → ({spawn.right}, {spawn.bottom})
        </div>
      </div>
    </div>
  );
});

ItemDetailsSpawn.displayName = 'ItemDetailsSpawn';
