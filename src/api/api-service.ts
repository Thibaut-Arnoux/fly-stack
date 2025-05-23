import type { HttpClient } from '@/api/http-client';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
} from '@/schemas/shared';
import type {
  SearchOptions,
  SearchPaginatedOptions,
  SearchParams,
  SearchSort,
} from '@/types/api';
import type { Options } from 'ky';
import type { ZodSchema, z } from 'zod';

export class ApiService {
  static readonly SEARCH_PARAMS: SearchParams = {
    _PER_PAGE: 20,
    _ORDER: 'asc',
  };

  protected _httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  private _formatSearchSort = (sort: SearchSort[]) => {
    const _sort = sort.map((s) => s.field).join(',');
    const _order = sort
      .map((s) => s.order ?? ApiService.SEARCH_PARAMS._ORDER)
      .join(',');

    return { _sort, _order };
  };

  private _formatSearchOptions = (options: SearchOptions): Options => {
    return {
      searchParams: {
        ...(options.sort !== undefined && {
          ...this._formatSearchSort(options.sort),
        }),
      },
    };
  };

  private _formatSearchPaginatedOptions = (
    options: SearchPaginatedOptions,
  ): Options => {
    const baseSearchParams = this._formatSearchOptions(options)
      .searchParams as object;

    return {
      searchParams: {
        ...baseSearchParams,
        _page: options.page,
        _limit: options.perPage ?? ApiService.SEARCH_PARAMS._PER_PAGE,
      },
    };
  };

  protected _get = async <T extends ZodSchema>(
    endpoint: string,
    schema: T,
  ): Promise<z.infer<T>> => {
    try {
      const data = await this._httpClient.get(endpoint);

      return schema.parse(data);
    } catch (error: unknown) {
      throw new Error('An error occurred while getting elements');
    }
  };

  protected _getPaginated = async <T extends ZodSchema>(
    endpoint: string,
    schema: T,
    options: SearchPaginatedOptions,
  ): Promise<PaginatedResponse<T>> => {
    try {
      const data = await this._httpClient.get(
        `${endpoint}`,
        this._formatSearchPaginatedOptions(options),
      );

      return paginatedResponseSchema(schema).parse(data);
    } catch (error: unknown) {
      throw new Error('An error occurred while getting paginated elements');
    }
  };
}
