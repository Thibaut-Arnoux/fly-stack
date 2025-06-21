import { createContext, type PropsWithChildren, useReducer } from 'react';
import type { SearchLike, SearchProperty, SearchSort } from '@/types/api';

type ApiOptionsState = {
  properties: SearchProperty[];
  sorts: SearchSort[];
  likes: SearchLike[];
  page: number;
  pageLimit: { first: number; last: number };
};
type ApiOptionsAction =
  | { type: 'upsertSort'; sort: SearchSort }
  | { type: 'removeSort'; field: SearchSort['field'] }
  | { type: 'upsertLike'; like: SearchLike }
  | { type: 'setPage'; page: number }
  | { type: 'setPageLimit'; pageLimit: { first: number; last: number } };
type ApiOptionsDispatch = (action: ApiOptionsAction) => void;

const apiOptionsReducer = (
  state: ApiOptionsState,
  action: ApiOptionsAction,
) => {
  switch (action.type) {
    case 'upsertSort': {
      const existingSortIndex = state.sorts.findIndex(
        (s) => s.field === action.sort.field,
      );
      if (existingSortIndex !== -1) {
        return {
          ...state,
          page: 1,
          sorts: state.sorts.map((s, index) =>
            index === existingSortIndex ? action.sort : s,
          ),
        };
      }

      return {
        ...state,
        page: 1,
        sorts: [...state.sorts, action.sort],
      };
    }
    case 'removeSort': {
      return {
        ...state,
        page: 1,
        sorts: state.sorts.filter((s) => s.field !== action.field),
      };
    }
    case 'upsertLike': {
      const existingLikeIndex = state.likes.findIndex(
        (l) => l.field === action.like.field,
      );
      if (existingLikeIndex !== -1) {
        return {
          ...state,
          page: 1,
          likes: state.likes.map((l, index) =>
            index === existingLikeIndex ? action.like : l,
          ),
        };
      }

      return {
        ...state,
        page: 1,
        likes: [...state.likes, action.like],
      };
    }
    case 'setPage': {
      return {
        ...state,
        page: action.page,
      };
    }
    case 'setPageLimit': {
      return {
        ...state,
        pageLimit: action.pageLimit,
      };
    }
  }
};

export const ApiOptionsContext = createContext<{
  state: ApiOptionsState;
  dispatch: ApiOptionsDispatch;
} | null>(null);

export const ApiOptionsProvider = ({
  children,
  initialState,
}: PropsWithChildren<{ initialState?: Partial<ApiOptionsState> }>) => {
  const [state, dispatch] = useReducer(apiOptionsReducer, {
    properties: [],
    sorts: [],
    likes: [],
    page: 1,
    pageLimit: { first: 1, last: 1 },
    ...initialState,
  });
  const value = { state, dispatch };

  return (
    <ApiOptionsContext.Provider value={value}>
      {children}
    </ApiOptionsContext.Provider>
  );
};
