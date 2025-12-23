import type { ItemColumns } from '@/schemas/item-schema';
import { ITEM_FILTER_FIELDS, ITEM_SORT_FIELDS } from '@/utils/constants';

export const isFilterEnabled = (field: keyof ItemColumns): boolean => {
  return (ITEM_FILTER_FIELDS as readonly string[]).includes(field);
};

export const isSortEnabled = (field: keyof ItemColumns): boolean => {
  return (ITEM_SORT_FIELDS as readonly string[]).includes(field);
};
