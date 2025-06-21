import { Store } from '@tanstack/react-store';
import type { SearchSort } from '@/types/api';

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
  addOrUpdateSort: (sort: ItemState['sorts'][number]) => void;
  removeSort: (field: ItemState['sorts'][number]['field']) => void;
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
  addOrUpdateSort: (sort: ItemState['sorts'][number]) => {
    itemStore.setState((state) => {
      const existingSortIndex = state.sorts.findIndex(
        (s) => s.field === sort.field,
      );
      // update
      if (existingSortIndex !== -1) {
        return {
          ...state,
          sorts: state.sorts.map((s, index) =>
            index === existingSortIndex ? sort : s,
          ),
        };
      }

      // create
      return {
        ...state,
        sorts: state.sorts.concat([sort]),
      };
    });
  },
  removeSort: (field: ItemState['sorts'][number]['field']) => {
    itemStore.setState((state) => ({
      ...state,
      sorts: state.sorts.filter((sort) => sort.field !== field),
    }));
  },
};

itemStore.subscribe((state) => {
  if (
    state.prevVal.search !== state.currentVal.search ||
    state.prevVal.sorts !== state.currentVal.sorts
  ) {
    itemActions.setPage(1);
  }
});
