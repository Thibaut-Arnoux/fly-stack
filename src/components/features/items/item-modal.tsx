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
        size="xl"
        className="p-0 overflow-hidden bg-base-100 max-h-[90vh]"
      >
        <Modal.Close className="z-20 text-base-content/70 hover:text-base-content" />

        {/* Hero Header */}
        <div className="relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-base-200 via-base-300 to-base-200 opacity-50" />
          <div
            className={cn(
              'absolute inset-0 opacity-10',
              rarityColor
                .split(' ')[0]
                .replace('bg-', 'bg-gradient-to-br from-'),
            )}
          />

          {/* Header Content */}
          <div className="relative px-8 py-8">
            <div className="flex items-start gap-6">
              {/* Item Icon with Glow */}
              <div className="relative flex-shrink-0">
                <div
                  className={cn(
                    'absolute inset-0 blur-xl opacity-40',
                    rarityColor,
                  )}
                />
                <div
                  className={cn(
                    'relative rounded-xl p-3 border-2 backdrop-blur-sm',
                    rarityColor,
                  )}
                >
                  <img
                    src={`${import.meta.env.VITE_FLYFF_API_BASE_URL}/image/item/${selectedItem.icon}`}
                    alt={selectedItem.name?.en ?? 'Item'}
                    className="w-24 h-24 object-contain relative z-10"
                  />
                </div>
                {selectedItem.premium && (
                  <div className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 rounded-full p-1.5 shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                )}
              </div>

              {/* Item Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-4xl font-black text-base-content mb-1 tracking-tight leading-none">
                      {selectedItem.name?.en ?? 'Unknown Item'}
                    </h2>
                    <p className="text-base-content/50 text-sm font-medium">
                      Item ID: {selectedItem.item_id}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-sm',
                      rarityColor,
                    )}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {selectedItem.rarity}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-base-200 text-base-content border border-base-300">
                    <TrendingUp className="w-3.5 h-3.5" />
                    LVL {selectedItem.level}
                  </span>

                  {selectedItem.element && selectedItem.element !== 'none' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                      <Shield className="w-3.5 h-3.5" />
                      {selectedItem.element}
                    </span>
                  )}
                </div>

                {/* Description */}
                {selectedItem.description?.en &&
                  selectedItem.description.en !== 'null' && (
                    <p className="text-base-content/70 leading-relaxed text-sm">
                      {selectedItem.description.en}
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body with Scroll */}
        <div className="overflow-y-auto max-h-[50vh] px-8 py-6">
          {/* Classification */}
          <Section title="Classification">
            <div className="grid grid-cols-3 gap-3">
              <InfoCard label="Category" value={selectedItem.category} />
              {selectedItem.subcategory && (
                <InfoCard
                  label="Subcategory"
                  value={selectedItem.subcategory}
                />
              )}
              {selectedItem.sex && (
                <InfoCard label="Gender" value={selectedItem.sex} />
              )}
            </div>
          </Section>

          {/* Economy */}
          <Section title="Economy">
            <div className="grid grid-cols-2 gap-3">
              <InfoCard
                label="Sell Price"
                value={`${formatPrice(selectedItem.sell_price)} Gold`}
                icon={<DollarSign className="w-4 h-4" />}
              />
              <InfoCard
                label="Stack Size"
                value={selectedItem.stack.toString()}
                icon={<Package className="w-4 h-4" />}
              />
            </div>
          </Section>

          {/* Properties */}
          <Section title="Properties">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <PropertyBadge
                label="Consumable"
                active={selectedItem.consumable}
                icon={<Coins className="w-3.5 h-3.5" />}
              />
              <PropertyBadge
                label="Premium"
                active={selectedItem.premium}
                icon={<Star className="w-3.5 h-3.5" />}
              />
              <PropertyBadge
                label="Shining"
                active={selectedItem.shining}
                icon={<Sparkles className="w-3.5 h-3.5" />}
              />
              <PropertyBadge
                label="Tradable"
                active={selectedItem.tradable}
                icon={<TrendingUp className="w-3.5 h-3.5" />}
              />
              <PropertyBadge
                label="Deletable"
                active={selectedItem.deletable}
                icon={<Trash2 className="w-3.5 h-3.5" />}
              />
              <PropertyBadge
                label="Real Time Duration"
                active={selectedItem.duration_real_time}
                icon={<Timer className="w-3.5 h-3.5" />}
              />
            </div>
          </Section>

          {/* Spawn Locations */}
          {selectedItem.spawns && selectedItem.spawns.length > 0 && (
            <Section title="Spawn Locations">
              <div className="space-y-2">
                {selectedItem.spawns.map((spawn, index) => (
                  <div
                    key={`${spawn.world}-${index}`}
                    className="flex items-start gap-3 p-3 bg-base-200 rounded-lg border border-base-300"
                  >
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-base-content">
                          World {spawn.world}
                        </span>
                        {spawn.continent !== undefined && (
                          <span className="text-xs px-2 py-0.5 bg-base-300 rounded-full text-base-content/70">
                            Continent {spawn.continent}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-base-content/60 font-mono">
                        Coordinates: ({spawn.left}, {spawn.top}) to (
                        {spawn.right}, {spawn.bottom})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-base-200 border-t border-base-300 flex items-center justify-between">
          <div className="text-xs text-base-content/50">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <button type="button" className="btn btn-primary" onClick={close}>
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
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="mb-6 last:mb-0">
    <h3 className="text-xs font-black uppercase tracking-widest text-base-content/60 mb-3 flex items-center gap-2">
      <div className="h-px flex-1 bg-base-300" />
      {title}
      <div className="h-px flex-1 bg-base-300" />
    </h3>
    {children}
  </div>
);

const InfoCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) => (
  <div className="bg-base-200 rounded-lg px-4 py-3 border border-base-300">
    <div className="flex items-center gap-1.5 text-xs font-bold text-base-content/60 uppercase tracking-wider mb-1.5">
      {icon}
      {label}
    </div>
    <div className="text-base font-bold text-base-content">{value}</div>
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
      'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold transition-colors',
      active
        ? 'bg-success/10 border-success/30 text-success'
        : 'bg-base-200 border-base-300 text-base-content/40',
    )}
  >
    {active ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
    <span className="flex items-center gap-1.5">
      {icon}
      {label}
    </span>
  </div>
);
