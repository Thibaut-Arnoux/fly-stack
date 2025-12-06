import {
  Check,
  Coins,
  DollarSign,
  MapPin,
  Package,
  Shield,
  Sparkles,
  Star,
  Timer,
  Trash2,
  TrendingUp,
  X,
} from 'lucide-react';
import { memo, type ReactNode } from 'react';
import type { Item } from '@/schemas/item-schema';
import { cn } from '@/utils/cn';
import { RARITY_COLORS } from '@/utils/constants';

interface ItemDetailModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper function outside component to avoid recreation
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US').format(price);
};

// Helper function to get rarity color
const getRarityColor = (rarity?: string): string => {
  if (!rarity) return RARITY_COLORS.common;
  return RARITY_COLORS[rarity.toLowerCase()] ?? RARITY_COLORS.common;
};

const ItemDetailModalComponent = ({
  item,
  isOpen,
  onClose,
}: ItemDetailModalProps) => {
  if (!item) return null;

  const rarityColor = getRarityColor(item.rarity);

  return (
    <dialog open={isOpen} onClose={onClose} className="modal modal-middle">
      <div className="modal-box p-0 flex flex-col max-w-4xl max-h-[85vh]">
        {/* Header */}
        <div className="border-b border-base-300 px-4 py-2">
          <div className="flex items-start gap-4">
            {/* Item Icon */}
            <div className="relative flex-shrink-0">
              <div
                className={cn(
                  'rounded-lg p-3 border-2',
                  rarityColor.replace('shadow-lg', '').trim(),
                )}
              >
                <img
                  src={`${import.meta.env.VITE_FLYFF_API_BASE_URL}/image/item/${item.icon}`}
                  alt={item.name?.en ?? 'Item'}
                  className="w-16 h-16 object-contain"
                />
              </div>
              {item.premium && (
                <div className="absolute -top-1 -right-1 bg-warning text-warning-content rounded-full p-1">
                  <Star className="w-3 h-3 fill-current" />
                </div>
              )}
            </div>

            {/* Item Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-base-content mb-1">
                {item.name?.en ?? 'Unknown Item'}
              </h2>
              <p className="text-base-content/50 text-xs font-mono mb-3">
                #{item.item_id}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide',
                    rarityColor.replace('shadow-lg', '').trim(),
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {item.rarity}
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-base-200 text-base-content">
                  <TrendingUp className="w-3.5 h-3.5" />
                  LVL {item.level}
                </span>

                {item.element && item.element !== 'none' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-info/20 text-info-content">
                    <Shield className="w-3.5 h-3.5" />
                    {item.element}
                  </span>
                )}
              </div>

              {/* Description */}
              {item.description?.en && item.description.en !== 'null' && (
                <p className="text-base-content/70 text-sm mt-3 leading-relaxed">
                  {item.description.en}
                </p>
              )}
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-1"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto min-h-0 px-4 py-2 space-y-6">
          {/* Classification */}
          <Section title="Classification">
            <div className="flex flex-wrap items-center gap-3">
              <InfoPill label="Category" value={item.category} />
              {item.subcategory && (
                <InfoPill label="Subcategory" value={item.subcategory} />
              )}
              {item.sex && <InfoPill label="Gender" value={item.sex} />}
            </div>
          </Section>

          {/* Economy */}
          <Section title="Economy">
            <div className="flex flex-wrap items-center gap-6">
              <InfoStat
                icon={<DollarSign className="w-4 h-4" />}
                label="Sell Price"
                value={formatPrice(item.sell_price)}
                unit="Gold"
              />
              <InfoStat
                icon={<Package className="w-4 h-4" />}
                label="Stack Size"
                value={item.stack.toString()}
              />
            </div>
          </Section>

          {/* Properties */}
          <Section title="Properties">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <PropertyBadge
                label="Consumable"
                active={item.consumable}
                icon={<Coins className="w-3.5 h-3.5" />}
              />
              <PropertyBadge
                label="Premium"
                active={item.premium}
                icon={<Star className="w-3.5 h-3.5" />}
              />
              <PropertyBadge
                label="Shining"
                active={item.shining}
                icon={<Sparkles className="w-3.5 h-3.5" />}
              />
              <PropertyBadge
                label="Tradable"
                active={item.tradable}
                icon={<TrendingUp className="w-3.5 h-3.5" />}
              />
              <PropertyBadge
                label="Deletable"
                active={item.deletable}
                icon={<Trash2 className="w-3.5 h-3.5" />}
              />
              <PropertyBadge
                label="Real Time Duration"
                active={item.duration_real_time}
                icon={<Timer className="w-3.5 h-3.5" />}
              />
            </div>
          </Section>

          {/* Spawn Locations */}
          {item.spawns && item.spawns.length > 0 && (
            <Section title="Spawn Locations">
              <div className="space-y-2">
                {item.spawns.map((spawn, index) => (
                  <div
                    key={`${spawn.world}-${index}`}
                    className="flex items-start gap-3 p-3 bg-base-200/50 rounded-lg border border-base-300"
                  >
                    <MapPin className="w-4 h-4 text-base-content/50 flex-shrink-0 mt-0.5" />
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
                      <div className="text-xs text-base-content/50 font-mono">
                        ({spawn.left}, {spawn.top}) → ({spawn.right},{' '}
                        {spawn.bottom})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button type="submit" aria-label="Close modal">
          close
        </button>
      </form>
    </dialog>
  );
};

// Memoize to prevent re-renders when item data hasn't changed
export const ItemDetailModal = memo(ItemDetailModalComponent);

// Helper Components - Memoized to prevent unnecessary re-renders
const Section = memo(
  ({ title, children }: { title: string; children: ReactNode }) => {
    return (
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/60 mb-3 flex items-center gap-2">
          {title}
          <div className="flex-1 h-px bg-base-300/50" />
        </h3>
        {children}
      </div>
    );
  },
);
Section.displayName = 'Section';

const InfoPill = memo(({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2 text-sm">
    <span className="text-base-content/50 font-medium">{label}</span>
    <span className="px-3 py-1 bg-base-300/60 rounded text-base-content font-semibold">
      {value}
    </span>
  </div>
));
InfoPill.displayName = 'InfoPill';

const InfoStat = memo(
  ({
    icon,
    label,
    value,
    unit,
  }: {
    icon: ReactNode;
    label: string;
    value: string;
    unit?: string;
  }) => (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-base-content/50">{icon}</span>
      <span className="text-base-content/50 font-medium">{label}</span>
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
InfoStat.displayName = 'InfoStat';

const PropertyBadge = memo(
  ({
    label,
    active,
    icon,
  }: {
    label: string;
    active: boolean;
    icon: ReactNode;
  }) => (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors',
        active
          ? 'bg-success/10 border-success/30 text-success'
          : 'bg-base-200/30 border-base-300/50 text-base-content/30',
      )}
    >
      {active ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <X className="w-3.5 h-3.5 opacity-50" />
      )}
      <span className="flex items-center gap-1.5">
        <span className="opacity-70">{icon}</span>
        {label}
      </span>
    </div>
  ),
);
PropertyBadge.displayName = 'PropertyBadge';
