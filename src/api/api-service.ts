import type { HttpClient } from '@/api/http-client';
import {
  type PaginatedResponse,
  paginatedResponseSchema,
} from '@/schemas/shared';
import type { ZodSchema, z } from 'zod';

export class ApiService {
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

  protected _getPaginated = async <T extends ZodSchema>(
    endpoint: string,
    schema: T,
  ): Promise<PaginatedResponse<T>> => {
    // TODO: map all options params (pages, per_page, sort, etc...)
    try {
      const data = await this._httpClient.get(`${endpoint}?_page=1`);

      return paginatedResponseSchema(schema).parse(data);
    } catch (error: unknown) {
      throw new Error('An error occurred while getting paginated elements');
    }
  };
}
