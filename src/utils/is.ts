import { ITEM_FILTER_FIELDS, ITEM_SORT_FIELDS } from '@/utils/constants';

export const isFilterEnabled = (field: string): boolean => {
  return (ITEM_FILTER_FIELDS as readonly string[]).includes(field);
};

export const isSortEnabled = (field: string): boolean => {
  return (ITEM_SORT_FIELDS as readonly string[]).includes(field);
};
