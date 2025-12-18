import { useModalData } from '@/components/ui/modals/hooks/use-modal-data';
import { Modal } from '@/components/ui/modals/modal';
import type { Item } from '@/schemas/item-schema';
import { ItemDetailsClassification } from './item-details-classification';
import { ItemDetailsEconomy } from './item-details-economy';
import { ItemDetailsHeader } from './item-details-header';
import { ItemDetailsProperties } from './item-details-properties';
import { ItemDetailsSpawns } from './item-details-spawns';

export const ItemDetailsModal = () => {
  const { data: item } = useModalData<Item>();

  if (!item) return null;

  return (
    <Modal>
      <Modal.Header>
        <ItemDetailsHeader item={item} />
      </Modal.Header>

      <Modal.Body className="space-y-6">
        <ItemDetailsClassification item={item} />
        <ItemDetailsEconomy item={item} />
        <ItemDetailsProperties item={item} />
        <ItemDetailsSpawns item={item} />
      </Modal.Body>

      <Modal.Footer />
    </Modal>
  );
};
