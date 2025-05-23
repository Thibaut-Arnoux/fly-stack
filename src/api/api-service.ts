import type { HttpClient } from '@/api/http-client';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
} from '@/schemas/shared';
import type {
  SearchOptions,
  SearchPaginatedOptions,
  SearchParams,
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

  private _formatSearchOptions = (options: SearchOptions): Options => {
    return {
      searchParams: {
        ...(options.sort !== undefined && { _sort: options.sort }),
        ...(options.sort !== undefined && {
          _order: options.order ?? ApiService.SEARCH_PARAMS._ORDER,
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
