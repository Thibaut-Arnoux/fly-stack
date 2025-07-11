import { useStore } from '@tanstack/react-store';
import { apiOptionsActions, apiOptionsStore } from '@/stores/api-options-store';

export const useApiOptionsLikes = () =>
  useStore(apiOptionsStore, (state) => state.likes);
export const useApiOptionsPage = () =>
  useStore(apiOptionsStore, (state) => state.page);
export const useApiOptionsPageLimit = () =>
  useStore(apiOptionsStore, (state) => state.pageLimit);
export const useApiOptionsSorts = () =>
  useStore(apiOptionsStore, (state) => state.sorts);

export const useApiOptionsActions = () => apiOptionsActions;
