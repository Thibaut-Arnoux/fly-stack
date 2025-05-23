export type OrderOptions = 'asc' | 'desc';

export type SearchProperty = {
  field: string;
  value: string;
};

export type SearchSort = {
  field: string;
  order?: OrderOptions;
};

export type SearchLike = {
  field: string;
  value: string;
};

export type SearchOptions = {
  properties?: SearchProperty[];
  sorts?: SearchSort[];
  likes?: SearchLike[];
};
export type SearchPaginatedOptions = SearchOptions & {
  page: number;
  perPage?: number;
};

export type SearchParams = {
  _PER_PAGE: number;
  _ORDER: OrderOptions;
};

export type LinkHeader = {
  first: number;
  last: number;
  prev?: number;
  next?: number;
};
