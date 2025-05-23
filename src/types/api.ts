export type OrderOptions = 'asc' | 'desc';

export type SearchOptions = {
  sort?: string;
  order?: OrderOptions;
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
