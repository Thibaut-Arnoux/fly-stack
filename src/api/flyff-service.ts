import { ApiService } from '@/api/api-service';
import { HttpClient } from '@/api/http-client';
import { classesSchema } from '@/schemas/class';
import { itemSchema } from '@/schemas/item';
import type { SearchPaginatedOptions } from '@/types/api';

class FlyffService extends ApiService {
  static readonly ENDPOINTS = {
    CLASSES: 'classes',
    ITEMS: 'items',
  } as const;

  constructor() {
    super(
      new HttpClient({
        baseUrl: import.meta.env.VITE_PROXY_FLYFF_API_BASE_URL,
      }),
    );
  }

  public getClasses = async () => {
    return this._get(FlyffService.ENDPOINTS.CLASSES, classesSchema);
  };

  public getItems = async (
    searchOptions: SearchPaginatedOptions,
    signal?: AbortSignal,
  ) => {
    return this._getPaginated(
      FlyffService.ENDPOINTS.ITEMS,
      itemSchema,
      searchOptions,
      signal,
    );
  };
}

export const flyffService = new FlyffService();
