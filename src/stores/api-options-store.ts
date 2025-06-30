import { Store } from '@tanstack/react-store';
import type { SearchLike, SearchSort } from '@/types/api';


function upsert<T, S extends Record<K, T[]>, K extends keyof S>(
  store: Store<S>,
  key: K,
  value: T,
  matchFn: (existingItem: T) => boolean
) {
  const list = store.state[key];
  const index = list.findIndex(matchFn);

  const updated = index !== -1
    ? list.map((v, i) => (i === index ? value : v))
    : [...list, value];

  store.setState({ ...store.state, [key]: updated });
}

type ApiOptionsState = {
  likes: SearchLike[];
  page: number;
  firstPage: number;
  lastPage: number;
  sorts: SearchSort[];
};

type ApiOptionsAction = {
  upsertLike: (like: ApiOptionsState['likes'][number]) => void;
  setPage: (page: ApiOptionsState['page']) => void;
  setFirstPage: (firstPage: ApiOptionsState['firstPage']) => void;
  setLastPage: (lastPage: ApiOptionsState['lastPage']) => void;
  addOrUpdateSort: (sort: ApiOptionsState['sorts'][number]) => void;
  removeSort: (field: ApiOptionsState['sorts'][number]['field']) => void;
};

export const apiOptionsStore = new Store<ApiOptionsState>({
  likes: [],
  page: 1,
  firstPage: 1,
  lastPage: 1,
  sorts: [{ field: 'level' }],
});

export const itemActions: ApiOptionsAction = {
  upsertLike: (like: ApiOptionsState['likes'][number]) => {
    upsert(apiOptionsStore, 'likes', like, (l) => l.field === like.field);
  },
  setPage: (page: ApiOptionsState['page']) => {
    apiOptionsStore.setState((state) => ({
      ...state,
      page,
    }));
  },
  setFirstPage: (firstPage: ApiOptionsState['firstPage']) => {
    apiOptionsStore.setState((state) => ({
      ...state,
      firstPage,
    }));
  },
  setLastPage: (lastPage: ApiOptionsState['lastPage']) => {
    apiOptionsStore.setState((state) => ({
      ...state,
      lastPage,
    }));
  },
  addOrUpdateSort: (sort: ApiOptionsState['sorts'][number]) => {
    apiOptionsStore.setState((state) => {
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
  removeSort: (field: ApiOptionsState['sorts'][number]['field']) => {
    apiOptionsStore.setState((state) => ({
      ...state,
      sorts: state.sorts.filter((sort) => sort.field !== field),
    }));
  },
};

apiOptionsStore.subscribe((state) => {
  if (
    state.prevVal.likes !== state.currentVal.likes ||
    state.prevVal.sorts !== state.currentVal.sorts
  ) {
    itemActions.setPage(1);
  }
});
