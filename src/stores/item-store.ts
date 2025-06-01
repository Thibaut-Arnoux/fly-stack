import { Store } from '@tanstack/react-store';

type ItemState = {
  search: string;
  page: number;
  firstPage: number;
  lastPage: number;
};

type ItemActions = {
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setFirstPage: (firstPage: number) => void;
  setLastPage: (lastPage: number) => void;
};

export const itemStore = new Store<ItemState>({
  search: '',
  page: 1,
  firstPage: 1,
  lastPage: 1,
});

export const itemActions: ItemActions = {
  setSearch: (search: string) => {
    itemStore.setState((state) => ({
      ...state,
      search,
    }));
  },
  setPage: (page: number) => {
    itemStore.setState((state) => ({
      ...state,
      page,
    }));
  },
  setFirstPage: (firstPage: number) => {
    itemStore.setState((state) => ({
      ...state,
      firstPage,
    }));
  },
  setLastPage: (lastPage: number) => {
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
