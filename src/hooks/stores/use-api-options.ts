import { useStore } from '@tanstack/react-store';
import { itemActions, apiOptionsStore } from '@/stores/api-options-store';

export const useApiOptionsLikes = () => useStore(apiOptionsStore, (state) => state.likes);
export const usePage = () => useStore(apiOptionsStore, (state) => state.page);
export const useFirstPage = () =>
  useStore(apiOptionsStore, (state) => state.firstPage);
export const useLastPage = () => useStore(apiOptionsStore, (state) => state.lastPage);
export const useSorts = () => useStore(apiOptionsStore, (state) => state.sorts);

export const useItemActions = () => itemActions;
