import type { HttpClient } from '@/api/http-client';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
} from '@/schemas/shared';
import type { PaginatedOptions } from '@/types/api';
import type { Options } from 'ky';
import type { ZodSchema, z } from 'zod';

export class ApiService {
  static readonly _PER_PAGE = 20;

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

  private _formatPaginatedOptions = (options: PaginatedOptions): Options => {
    return {
      searchParams: {
        _page: options.page,
        _per_page: options.perPage ?? ApiService._PER_PAGE,
      },
    };
  };

  protected _getPaginated = async <T extends ZodSchema>(
    endpoint: string,
    schema: T,
    options?: PaginatedOptions,
  ): Promise<PaginatedResponse<T>> => {
    try {
      const data = await this._httpClient.get(
        `${endpoint}`,
        this._formatPaginatedOptions(options ?? { page: 1 }),
      );

      return paginatedResponseSchema(schema).parse(data);
    } catch (error: unknown) {
      throw new Error('An error occurred while getting paginated elements');
    }
  };
}
