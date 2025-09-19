import { Store } from '@tanstack/react-store';
import type { SearchLike, SearchRange, SearchSort } from '@/types/api';
import { ITEM_CONSTANTS } from '@/utils/constants';
import { upsert } from '@/utils/store';

type ApiOptionsState = {
  likes: SearchLike[];
  page: number;
  pageLimit: { firstPage: number; lastPage: number };
  ranges: SearchRange[];
  sorts: SearchSort[];
};

type ApiOptionsActions = {
  upsertLike: (like: ApiOptionsState['likes'][number]) => void;
  setPage: (page: ApiOptionsState['page']) => void;
  setPageLimit: (pageLimit: ApiOptionsState['pageLimit']) => void;
  upsertRange: (range: ApiOptionsState['ranges'][number]) => void;
  upsertSort: (sort: ApiOptionsState['sorts'][number]) => void;
  removeSort: (field: ApiOptionsState['sorts'][number]['field']) => void;
  reset: () => void;
};

const initialState: ApiOptionsState = {
  // likes: [],
  likes: [{ field: 'name.en', value: 'shuran' }],
  page: 1,
  pageLimit: { firstPage: 1, lastPage: 1 },
  ranges: [
    {
      field: 'level',
      min: ITEM_CONSTANTS.LEVEL.MIN,
      max: ITEM_CONSTANTS.LEVEL.MAX,
    },
  ],
  sorts: [{ field: 'level' }],
};

export const apiOptionsStore = new Store<ApiOptionsState>(initialState);

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
  upsertRange: (range: ApiOptionsState['ranges'][number]) => {
    upsert(apiOptionsStore, 'ranges', range, (r) => r.field === range.field);
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
  reset: () => {
    apiOptionsStore.setState(initialState);
  },
};

apiOptionsStore.subscribe((state) => {
  if (
    state.prevVal.likes !== state.currentVal.likes ||
    state.prevVal.sorts !== state.currentVal.sorts ||
    state.prevVal.pageLimit !== state.currentVal.pageLimit
  ) {
    apiOptionsActions.setPage(1);
  }
});
