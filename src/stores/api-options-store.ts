import { Store } from '@tanstack/react-store';
import type { SearchLike, SearchSort } from '@/types/api';
import { upsert } from '@/utils/store';

type ApiOptionsState = {
  likes: SearchLike[];
  page: number;
  pageLimit: { firstPage: number; lastPage: number };
  sorts: SearchSort[];
};

type ApiOptionsActions = {
  upsertLike: (like: ApiOptionsState['likes'][number]) => void;
  setPage: (page: ApiOptionsState['page']) => void;
  setPageLimit: (pageLimit: ApiOptionsState['pageLimit']) => void;
  upsertSort: (sort: ApiOptionsState['sorts'][number]) => void;
  removeSort: (field: ApiOptionsState['sorts'][number]['field']) => void;
};

export const apiOptionsStore = new Store<ApiOptionsState>({
  likes: [],
  page: 1,
  pageLimit: { firstPage: 1, lastPage: 1 },
  sorts: [{ field: 'level' }],
});

export const apiOptionsActions: ApiOptionsActions = {
  upsertLike: (like: ApiOptionsState['likes'][number]) => {
    upsert(apiOptionsStore, 'likes', like, (l) => l.field === like.field);
  },
  setPage: (page: ApiOptionsState['page']) => {
    apiOptionsStore.setState((state) => ({
      ...state,
      page,
    }));
  },
  setPageLimit: (pageLimit: ApiOptionsState['pageLimit']) => {
    apiOptionsStore.setState((state) => ({
      ...state,
      pageLimit,
    }));
  },
  upsertSort: (sort: ApiOptionsState['sorts'][number]) => {
    upsert(apiOptionsStore, 'sorts', sort, (s) => s.field === sort.field);
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
    apiOptionsActions.setPage(1);
  }
});
