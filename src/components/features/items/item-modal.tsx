import { eq } from '@tanstack/db';
import { useLiveQuery } from '@tanstack/react-db';
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
import { createContext, type ReactNode, useContext, useState } from 'react';
import { itemCollection } from '@/collections/item-collection';
import { Modal } from '@/components/ui/modals/modal';
import { cn } from '@/utils/cn';
import { RARITY_COLORS } from '@/utils/constants';

interface ItemModalContextType {
  selectedItemId: string | null;
  openWithItemId: (itemId: string) => void;
  close: () => void;
}

const ItemModalContext = createContext<ItemModalContextType | null>(null);

export const useItemModal = (): ItemModalContextType => {
  const context = useContext(ItemModalContext);
  if (!context) {
    throw new Error('useItemModal must be used within ItemModalProvider');
  }
  return context;
};

interface ItemModalProviderProps {
  children: ReactNode;
}

export const ItemModalProvider = ({ children }: ItemModalProviderProps) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const value: ItemModalContextType = {
    selectedItemId,
    openWithItemId: (itemId: string) => {
      setSelectedItemId(itemId);
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
      setTimeout(() => setSelectedItemId(null), 200);
    },
  };

  return (
    <ItemModalContext.Provider value={value}>
      {children}
      {selectedItemId && (
        <ItemModalContent isOpen={isOpen} itemId={selectedItemId} />
      )}
    </ItemModalContext.Provider>
  );
};

interface ItemModalContentProps {
  isOpen: boolean;
  itemId: string;
}

const ItemModalContent = ({ isOpen, itemId }: ItemModalContentProps) => {
  const { close } = useItemModal();

  // Fetch the specific item from the collection
  const { data: items } = useLiveQuery((q) =>
    q.from({ item: itemCollection }).where(({ item }) => eq(item.id, itemId)),
  );

  console.debug(items);

  const selectedItem = items?.[0];

  if (!selectedItem) return null;

  const rarityColor =
    RARITY_COLORS[selectedItem.rarity.toLowerCase()] || RARITY_COLORS.common;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && close()}>
      <Modal.Content
        size="lg"
        className="p-0 overflow-hidden bg-base-100 max-h-[90vh]"
      >
        <Modal.Close className="z-20 text-base-content/50 hover:text-base-content" />

        {/* Minimal Header */}
        <div className="border-b border-base-300">
          <div className="px-6 py-5">
            <div className="flex items-start gap-5">
              {/* Item Icon - Clean */}
              <div className="relative flex-shrink-0">
                <div
                  className={cn(
                    'rounded-lg p-2 border',
                    rarityColor.replace('shadow-lg', '').trim(),
                  )}
                >
                  <img
                    src={`${import.meta.env.VITE_FLYFF_API_BASE_URL}/image/item/${selectedItem.icon}`}
                    alt={selectedItem.name?.en ?? 'Item'}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                {selectedItem.premium && (
                  <div className="absolute -top-1 -right-1 bg-warning text-warning-content rounded-full p-1">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                )}
              </div>

              {/* Item Info - Compact */}
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-base-content mb-1 leading-tight">
                  {selectedItem.name?.en ?? 'Unknown Item'}
                </h2>
                <p className="text-base-content/50 text-xs font-mono mb-3">
                  #{selectedItem.item_id}
                </p>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide',
                      rarityColor.replace('shadow-lg', '').trim(),
                    )}
                  >
                    <Sparkles className="w-3 h-3" />
                    {selectedItem.rarity}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-base-200 text-base-content">
                    <TrendingUp className="w-3 h-3" />
                    LVL {selectedItem.level}
                  </span>

                  {selectedItem.element && selectedItem.element !== 'none' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-info/20 text-info-content">
                      <Shield className="w-3 h-3" />
                      {selectedItem.element}
                    </span>
                  )}
                </div>

                {/* Description */}
                {selectedItem.description?.en &&
                  selectedItem.description.en !== 'null' && (
                    <p className="text-base-content/60 leading-snug text-xs mt-3">
                      {selectedItem.description.en}
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body with Scroll */}
        <div className="overflow-y-auto max-h-[50vh]">
          {/* Classification */}
          <Section title="Classification" variant="default">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <InfoPill label="Category" value={selectedItem.category} />
              {selectedItem.subcategory && (
                <InfoPill
                  label="Subcategory"
                  value={selectedItem.subcategory}
                />
              )}
              {selectedItem.sex && (
                <InfoPill label="Gender" value={selectedItem.sex} />
              )}
            </div>
          </Section>

          {/* Economy */}
          <Section title="Economy" variant="bordered">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <InfoStat
                icon={<DollarSign className="w-3.5 h-3.5" />}
                label="Sell Price"
                value={formatPrice(selectedItem.sell_price)}
                unit="Gold"
              />
              <InfoStat
                icon={<Package className="w-3.5 h-3.5" />}
                label="Stack Size"
                value={selectedItem.stack.toString()}
              />
            </div>
          </Section>

          {/* Properties */}
          <Section title="Properties" variant="default">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              <PropertyBadge
                label="Consumable"
                active={selectedItem.consumable}
                icon={<Coins className="w-3 h-3" />}
              />
              <PropertyBadge
                label="Premium"
                active={selectedItem.premium}
                icon={<Star className="w-3 h-3" />}
              />
              <PropertyBadge
                label="Shining"
                active={selectedItem.shining}
                icon={<Sparkles className="w-3 h-3" />}
              />
              <PropertyBadge
                label="Tradable"
                active={selectedItem.tradable}
                icon={<TrendingUp className="w-3 h-3" />}
              />
              <PropertyBadge
                label="Deletable"
                active={selectedItem.deletable}
                icon={<Trash2 className="w-3 h-3" />}
              />
              <PropertyBadge
                label="Real Time Duration"
                active={selectedItem.duration_real_time}
                icon={<Timer className="w-3 h-3" />}
              />
            </div>
          </Section>

          {/* Spawn Locations */}
          {selectedItem.spawns && selectedItem.spawns.length > 0 && (
            <Section title="Spawn Locations" variant="accent">
              <div className="space-y-1.5">
                {selectedItem.spawns.map((spawn, index) => (
                  <div
                    key={`${spawn.world}-${index}`}
                    className="flex items-start gap-2.5 p-2.5 bg-base-200/50 rounded border border-base-300/50"
                  >
                    <MapPin className="w-4 h-4 text-base-content/40 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-xs text-base-content">
                          World {spawn.world}
                        </span>
                        {spawn.continent !== undefined && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-base-300/70 rounded text-base-content/60">
                            Continent {spawn.continent}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-base-content/50 font-mono">
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

        {/* Minimal Footer */}
        <div className="px-6 py-2 border-t border-base-300 flex items-center justify-end">
          <button type="button" className="btn btn-sm" onClick={close}>
            Close
          </button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

// Helper Components
const Section = ({
  title,
  children,
  variant = 'default',
}: {
  title: string;
  children: ReactNode;
  variant?: 'default' | 'striped' | 'bordered' | 'accent';
}) => {
  const variantStyles = {
    default: 'px-6 py-2.5',
    striped: 'px-6 py-2.5 bg-base-200/30',
    bordered: 'px-6 py-2.5',
    accent: 'px-6 py-2.5 bg-gradient-to-r from-base-200/40 to-transparent',
  };

  return (
    <div className={cn('relative', variantStyles[variant])}>
      {variant === 'accent' && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50" />
      )}
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 mb-3 flex items-center gap-2">
        {title}
        <div className="flex-1 h-px bg-base-300/50" />
      </h3>
      {children}
    </div>
  );
};

const InfoPill = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-base-content/40 font-medium">{label}</span>
    <span className="px-2.5 py-1 bg-base-300/50 rounded text-base-content font-semibold">
      {value}
    </span>
  </div>
);

const InfoStat = ({
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
  <div className="flex items-center gap-2">
    <span className="text-base-content/40">{icon}</span>
    <span className="text-base-content/40 font-medium">{label}</span>
    <span className="text-base-content font-bold">
      {value}
      {unit && (
        <span className="text-[10px] font-normal ml-1 text-base-content/50">
          {unit}
        </span>
      )}
    </span>
  </div>
);

const PropertyBadge = ({
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
      'flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-medium transition-colors',
      active
        ? 'bg-success/10 border-success/30 text-success'
        : 'bg-base-200/30 border-base-300/50 text-base-content/30',
    )}
  >
    {active ? (
      <Check className="w-3 h-3" />
    ) : (
      <X className="w-3 h-3 opacity-50" />
    )}
    <span className="flex items-center gap-1">
      <span className="opacity-60">{icon}</span>
      {label}
    </span>
  </div>
);
