import type { FilterFn } from '@tanstack/react-table';

/**
 * TanStack Table module augmentation for custom filter functions.
 *
 * This extends TanStack Table's types to include custom filter functions
 * while keeping filterFns optional on table instances.
 *
 * @see https://tanstack.com/table/latest/docs/guide/column-filtering
 * @see https://tanstack.com/table/v8/docs/api/features/column-filtering
 * @see https://github.com/TanStack/table/discussions/4554
 */
declare module '@tanstack/table-core' {
  /**
   * Custom filter functions registry.
   *
   * Adding filters here enables type-safe string references in column definitions.
   */
  interface FilterFns {
    arrEqualsSome: FilterFn<unknown>;
  }
}
