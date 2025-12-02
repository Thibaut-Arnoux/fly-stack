import type {
  ColumnFilter,
  ColumnFiltersState,
  ColumnSort,
  SortingState,
} from '@tanstack/react-table';

export type ParsedSearch = {
  filters: ColumnFiltersState;
  sorts: SortingState;
};

export const parseCommaSeparatedEnum = (
  id: string,
  value: string | undefined,
  enumArray: readonly string[],
): ColumnFilter | undefined => {
  if (!value || value.trim() === '') return;

  const parsed = value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item !== '' && enumArray.includes(item));

  if (parsed.length === 0) return;

  return { id, value: parsed };
};

export const parseRange = (
  id: string,
  value: string | undefined,
  options?: { minValue?: number; maxValue?: number },
): ColumnFilter | undefined => {
  if (!value || value.trim() === '') return;

  const parts = value.split(',').map((part) => part.trim());
  if (parts.length !== 2) return;

  const min = parseInt(parts[0], 10);
  const max = parseInt(parts[1], 10);

  if (Number.isNaN(min) || Number.isNaN(max)) return;

  if (options) {
    const MIN = options.minValue ?? Number.NEGATIVE_INFINITY;
    const MAX = options.maxValue ?? Number.POSITIVE_INFINITY;
    if (min < MIN || min > MAX || max < MIN || max > MAX) return;
  }

  const sortedMin = Math.min(min, max);
  const sortedMax = Math.max(min, max);

  return { id, value: [sortedMin, sortedMax] };
};

export const toSortingState = (
  value: string | undefined,
  validFields?: readonly string[],
  defaultSort?: ColumnSort,
): SortingState => {
  if (!value || value.trim() === '') {
    return defaultSort ? [defaultSort] : [];
  }

  const sorts = value
    .split(',')
    .map((field) => field.trim())
    .filter((field) => field !== '')
    .map((field) => {
      const isDesc = field.startsWith('-');
      const fieldName = isDesc ? field.slice(1) : field;

      if (!validFields) return { id: fieldName, desc: isDesc };
      if (!validFields.includes(fieldName)) return null;

      return { id: fieldName, desc: isDesc };
    })
    .filter((sort): sort is ColumnSort => sort !== null);

  if (sorts.length > 0) return sorts;

  return defaultSort ? [defaultSort] : [];
};

export const toColumnFiltersState = (
  filters: Record<string, ColumnFilter | undefined>,
): ColumnFiltersState => {
  return Object.values(filters).filter(
    (filter): filter is ColumnFilter => filter !== undefined,
  );
};

export const fromSortingState = (sorts: SortingState): string => {
  if (!sorts || sorts.length === 0) return '';

  return sorts.map((sort) => (sort.desc ? `-${sort.id}` : sort.id)).join(',');
};

const serializeFilterValue = (value: unknown): string | undefined => {
  if (typeof value === 'string') return value || undefined;

  if (Array.isArray(value) && value.length) return value.join(',');
};

export const fromColumnFiltersState = (
  filters: ColumnFiltersState,
): Record<string, string> => {
  const params: Record<string, string> = {};

  for (const filter of filters) {
    const serialized = serializeFilterValue(filter.value);
    if (!serialized) continue;

    params[filter.id] = serialized;
  }

  return params;
};
