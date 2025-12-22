import { electricCollectionOptions } from '@tanstack/electric-db-collection';
import { createCollection } from '@tanstack/react-db';
import { flyffService } from '@/api/flyff-service';
import { type ItemUser, itemUserSchema } from '@/schemas/item-user-schema';

export const itemUserCollection = createCollection(
  electricCollectionOptions({
    id: 'item-user',
    shapeOptions: {
      url: flyffService.urls.itemUsers,
      fetchClient: flyffService.httpClient.asFetch,
    },
    schema: itemUserSchema,
    getKey: (itemUser) => itemUser.id,
    onInsert: async ({ transaction }) => {
      const insertedItem = transaction.mutations[0].modified;
      const response = await flyffService.storeItemUser({
        item_id: insertedItem.item_id,
        favorite: insertedItem.favorite,
        note: insertedItem.note,
      });

      return { txid: response.txid };
    },
    onUpdate: async ({ transaction }) => {
      const updatedKey = transaction.mutations[0].key;
      const changes = transaction.mutations[0].changes;
      const response = await flyffService.updateItemUser(updatedKey, {
        favorite: changes?.favorite,
        note: changes?.note,
      });

      return { txid: response.txid };
    },
  }),
);

export const insertItemUser = ({
  itemId,
  favorite = false,
  note = null,
}: {
  itemId: ItemUser['item_id'];
  favorite?: ItemUser['favorite'];
  note?: ItemUser['note'];
}) => {
  itemUserCollection.insert({
    id: crypto.randomUUID(),
    item_id: itemId,
    favorite,
    note,
    created_at: null,
    updated_at: null,
  });
};

export const insertFavoriteItem = ({
  itemId,
}: {
  itemId: ItemUser['item_id'];
}) => {
  insertItemUser({ itemId, favorite: true });
};

export const insertNoteItem = ({
  itemId,
  note,
}: {
  itemId: ItemUser['item_id'];
  note: ItemUser['note'];
}) => {
  insertItemUser({ itemId, note });
};

export const updateItemUser = ({
  id,
  favorite,
  note,
}: {
  id: ItemUser['id'];
  favorite?: ItemUser['favorite'];
  note?: ItemUser['note'];
}) => {
  itemUserCollection.update(id, (draft) => {
    if (favorite !== undefined) {
      draft.favorite = favorite;
    }
    if (note !== undefined) {
      draft.note = note;
    }
  });
};

export const updateFavoriteItem = ({
  id,
  favorite,
}: {
  id: ItemUser['id'];
  favorite: ItemUser['favorite'];
}) => {
  updateItemUser({ id, favorite });
};

export const updateNoteItem = ({
  id,
  note,
}: {
  id: ItemUser['id'];
  note: ItemUser['note'];
}) => {
  updateItemUser({ id, note });
};
