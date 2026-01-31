import { memo } from 'react';
import { useModalData } from '@/components/ui/modals/hooks/use-modal-data';
import { Modal } from '@/components/ui/modals/modal';
import type { Item } from '@/schemas/item-schema';
import { ItemDetailsAbilities } from './item-details-abilities';
import { ItemDetailsClassification } from './item-details-classification';
import { ItemDetailsCombat } from './item-details-combat';
import { ItemDetailsEconomy } from './item-details-economy';
import { ItemDetailsExtra } from './item-details-extra';
import { ItemDetailsHeader } from './item-details-header';
import { ItemDetailsProperties } from './item-details-properties';
import { ItemDetailsSpawns } from './item-details-spawns';

export const ItemDetailsModal = memo(() => {
  const { data: item } = useModalData<Item>();

  if (!item) {
    return null;
  }

  return (
    <Modal>
      <Modal.Header>
        <ItemDetailsHeader item={item} />
      </Modal.Header>

      <Modal.Body className="space-y-6">
        <ItemDetailsClassification item={item} />
        <ItemDetailsCombat item={item} />
        <ItemDetailsAbilities item={item} />
        <ItemDetailsEconomy item={item} />
        <ItemDetailsProperties item={item} />
        <ItemDetailsExtra item={item} />
        <ItemDetailsSpawns item={item} />
      </Modal.Body>

      <Modal.Footer />
    </Modal>
  );
});

ItemDetailsModal.displayName = 'ItemDetailsModal';
