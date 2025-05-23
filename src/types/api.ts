export type PaginatedOptions = {
  page: number;
  perPage?: number;
};

export type LinkHeader = {
  first: number;
  last: number;
  prev?: number;
  next?: number;
};
