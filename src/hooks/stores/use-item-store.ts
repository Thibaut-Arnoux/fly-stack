import { useStore } from '@tanstack/react-store';
import { itemActions, itemStore } from '@/stores/item-store';

export const useSearch = () => useStore(itemStore, (state) => state.search);
export const usePage = () => useStore(itemStore, (state) => state.page);
export const useFirstPage = () =>
  useStore(itemStore, (state) => state.firstPage);
export const useLastPage = () => useStore(itemStore, (state) => state.lastPage);
export const useSorts = () => useStore(itemStore, (state) => state.sorts);

export const useItemActions = () => itemActions;
