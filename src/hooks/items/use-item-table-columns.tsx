import { createColumnHelper } from '@tanstack/react-table';
import { PenLine, Star } from 'lucide-react';
import { type ToggleEvent, useMemo, useState } from 'react';
import {
  insertFavoriteItem,
  insertNoteItem,
  updateFavoriteItem,
  updateNoteItem,
} from '@/collections/item-user-collection';
import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { Dropdown } from '@/components/ui/dropdowns/dropdown';
import { Textarea } from '@/components/ui/inputs/textarea';
import { useModal } from '@/components/ui/modals/hooks/use-modal';
import type { ItemWithUserLinks } from '@/schemas/item-schema';
import { cn } from '@/utils/cn';
import { isFilterEnabled, isSortEnabled } from '@/utils/is';

const IconCell = ({ icon }: { icon: string }) => {
  return (
    <img
      width={32}
      height={32}
      className="min-w-8"
      src={`${import.meta.env.VITE_FLYFF_API_BASE_URL}/image/item/${icon}`}
      alt={icon}
    />
  );
};

const BookmarkCell = ({ item }: { item: ItemWithUserLinks }) => {
  const [note, setNote] = useState(item.note ?? '');

  const handleDropdownToggle = (e: ToggleEvent<HTMLDivElement>) => {
    if (e.newState === 'open') {
      setNote(item.note ?? '');
    }
  };

  const handleFavoriteClick = () => {
    const itemUserId = item.item_user_id;

    if (!itemUserId) {
      insertFavoriteItem({ itemId: item.id });
    } else {
      updateFavoriteItem({ id: itemUserId, favorite: !item.favorite });
    }
  };

  const handleSaveNote = () => {
    const itemUserId = item.item_user_id;

    if (!itemUserId) {
      insertNoteItem({ itemId: item.id, note: note || null });
    } else {
      updateNoteItem({ id: itemUserId, note: note || null });
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Star
        size={20}
        onClick={handleFavoriteClick}
        className={cn(
          'shrink-0 transition-all hover:brightness-150 hover:scale-110 cursor-pointer',
          item.favorite
            ? 'fill-warning text-warning'
            : 'text-base-content opacity-30',
        )}
      />
      <Dropdown>
        <Dropdown.Trigger>
          <IconButton
            className={cn('w-8 h-8', item.note && 'brightness-150')}
            icon={<PenLine size={18} />}
          />
        </Dropdown.Trigger>
        <Dropdown.Content onToggle={handleDropdownToggle}>
          <div className="flex flex-col gap-2">
            <Textarea
              name="note"
              placeholder="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button
              size="sm"
              className="w-1/3 ml-auto"
              onClick={handleSaveNote}
            >
              Save
            </Button>
          </div>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
};

const NameCell = ({
  itemName,
  item,
}: {
  itemName?: string;
  item: ItemWithUserLinks;
}) => {
  const { open } = useModal<ItemWithUserLinks>();

  const handleClick = () => {
    open(item);
  };

  return (
    <button
      type="button"
      className="link link-hover text-left font-medium"
      onClick={handleClick}
    >
      {itemName ?? '-'}
    </button>
  );
};

export const useItemTableColumns = () => {
  const columnHelper = createColumnHelper<ItemWithUserLinks>();

  return useMemo(
    () => [
      columnHelper.accessor((row) => row.favorite, {
        id: 'favorite',
        header: 'Bookmark',
        cell: (props) => <BookmarkCell item={props.row.original} />,
        size: 50,
        enableSorting: isSortEnabled('favorite'),
        enableColumnFilter: isFilterEnabled('favorite'),
      }),
      columnHelper.display({
        id: 'icon',
        header: 'Icon',
        cell: (props) => <IconCell icon={props.row.original.icon} />,
        size: 50,
        enableSorting: isSortEnabled('icon'),
        enableColumnFilter: isFilterEnabled('icon'),
      }),
      columnHelper.accessor((row) => row.name?.en || undefined, {
        id: 'name',
        header: 'Name',
        cell: (props) => (
          <NameCell
            itemName={props.row.original.name?.en}
            item={props.row.original}
          />
        ),
        size: 150,
        enableSorting: isSortEnabled('name'),
        sortingFn: 'alphanumeric',
        enableColumnFilter: isFilterEnabled('name'),
        filterFn: 'includesString',
      }),
      columnHelper.accessor((row) => row.description?.en || undefined, {
        id: 'description',
        header: 'Description',
        cell: (props) => props.renderValue() ?? '-',
        size: 250,
        enableSorting: isSortEnabled('description'),
        sortingFn: 'alphanumeric',
        sortDescFirst: false,
        enableColumnFilter: isFilterEnabled('description'),
      }),
      columnHelper.accessor((row) => row.sex ?? undefined, {
        id: 'sex',
        header: 'Sex',
        cell: (props) => props.renderValue() ?? '-',
        size: 50,
        enableSorting: isSortEnabled('sex'),
        sortingFn: 'text',
        enableColumnFilter: isFilterEnabled('sex'),
      }),
      columnHelper.accessor('category', {
        id: 'category',
        header: 'Category',
        cell: (props) => props.renderValue(),
        size: 80,
        enableSorting: isSortEnabled('category'),
        sortingFn: 'text',
        enableColumnFilter: isFilterEnabled('category'),
        filterFn: 'arrIncludesSome',
      }),
      columnHelper.accessor((row) => row.subcategory ?? undefined, {
        id: 'subcategory',
        header: 'Subcategory',
        cell: (props) => props.renderValue() ?? '-',
        size: 80,
        enableSorting: isSortEnabled('subcategory'),
        sortingFn: 'text',
        enableColumnFilter: isFilterEnabled('subcategory'),
        filterFn: 'arrIncludesSome',
      }),
      columnHelper.accessor('rarity', {
        id: 'rarity',
        header: 'Rarity',
        cell: (props) => props.renderValue(),
        size: 80,
        enableSorting: isSortEnabled('rarity'),
        sortingFn: 'text',
        enableColumnFilter: isFilterEnabled('rarity'),
        filterFn: 'arrEqualsSome',
      }),
      columnHelper.accessor('level', {
        id: 'level',
        cell: (props) => props.renderValue(),
        header: 'Level',
        size: 50,
        enableSorting: isSortEnabled('level'),
        sortingFn: 'alphanumeric',
        sortDescFirst: false,
        enableColumnFilter: isFilterEnabled('level'),
        filterFn: 'inNumberRange',
      }),
    ],
    [columnHelper],
  );
};
