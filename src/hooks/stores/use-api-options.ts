import { useStore } from '@tanstack/react-store';
import { apiOptionsStore, itemActions } from '@/stores/api-options-store';

export const useApiOptionsLikes = () =>
  useStore(apiOptionsStore, (state) => state.likes);
export const usePage = () => useStore(apiOptionsStore, (state) => state.page);
export const useApiOptionsPageLimit = () =>
  useStore(apiOptionsStore, (state) => state.pageLimit);
export const useSorts = () => useStore(apiOptionsStore, (state) => state.sorts);

export const useItemActions = () => itemActions;
