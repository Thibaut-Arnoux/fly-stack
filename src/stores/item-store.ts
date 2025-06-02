import type { SearchSort } from '@/types/api';
import { Store } from '@tanstack/react-store';

type ItemState = {
  search: string;
  page: number;
  firstPage: number;
  lastPage: number;
  sorts: SearchSort[];
};

type ItemActions = {
  setSearch: (search: ItemState['search']) => void;
  setPage: (page: ItemState['page']) => void;
  setFirstPage: (firstPage: ItemState['firstPage']) => void;
  setLastPage: (lastPage: ItemState['lastPage']) => void;
};

export const itemStore = new Store<ItemState>({
  search: '',
  page: 1,
  firstPage: 1,
  lastPage: 1,
  sorts: [{ field: 'level' }],
});

export const itemActions: ItemActions = {
  setSearch: (search: ItemState['search']) => {
    itemStore.setState((state) => ({
      ...state,
      search,
    }));
  },
  setPage: (page: ItemState['page']) => {
    itemStore.setState((state) => ({
      ...state,
      page,
    }));
  },
  setFirstPage: (firstPage: ItemState['firstPage']) => {
    itemStore.setState((state) => ({
      ...state,
      firstPage,
    }));
  },
  setLastPage: (lastPage: ItemState['lastPage']) => {
    itemStore.setState((state) => ({
      ...state,
      lastPage,
    }));
  },
};

itemStore.subscribe((state) => {
  if (state.prevVal.search !== state.currentVal.search) {
    itemActions.setPage(1);
  }
});
