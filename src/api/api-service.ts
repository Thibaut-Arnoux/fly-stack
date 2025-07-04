import type { Options } from 'ky';
import type { ZodSchema, z } from 'zod';
import type { HttpClient } from '@/api/http-client';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
} from '@/schemas/shared';
import type {
  SearchLike,
  SearchOptions,
  SearchPaginatedOptions,
  SearchParams,
  SearchProperty,
  SearchSort,
} from '@/types/api';

export class ApiService {
  static readonly SEARCH_PARAMS: SearchParams = {
    _PER_PAGE: 20,
    _ORDER: 'asc',
  };

  protected _httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  private _formatSearchProperties = (
    properties: SearchProperty[],
  ): Record<string, string> => {
    return Object.fromEntries(
      properties.map((property) => [property.field, property.value]),
    );
  };

  private _formatSearchSorts = (sorts: SearchSort[]) => {
    const _sort = sorts.map((s) => s.field).join(',');
    const _order = sorts
      .map((s) => s.order ?? ApiService.SEARCH_PARAMS._ORDER)
      .join(',');

    return { _sort, _order };
  };

  private _formatSearchLikes = (
    likes: SearchLike[],
  ): Record<string, string> => {
    return Object.fromEntries(
      likes
        .filter((like) => like.value)
        .map((like) => [`${like.field}_like`, like.value]),
    );
  };

  private _formatSearchOptions = (options: SearchOptions): Options => {
    return {
      searchParams: {
        ...(options.properties !== undefined &&
          options.properties.length > 0 && {
            ...this._formatSearchProperties(options.properties),
          }),
        ...(options.sorts !== undefined &&
          options.sorts.length > 0 && {
            ...this._formatSearchSorts(options.sorts),
          }),
        ...(options.likes !== undefined &&
          options.likes.length > 0 && {
            ...this._formatSearchLikes(options.likes),
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
    } catch (_error: unknown) {
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
    } catch (_error: unknown) {
      throw new Error('An error occurred while getting paginated elements');
    }
  };
}
