import { HttpClient } from '@/api/http-client';
import { classesSchema } from '@/schemas/class';
import { itemSchema } from '@/schemas/item';
import { ApiService } from './api-service';

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

  public getItems = async () => {
    return this._getPaginated(FlyffService.ENDPOINTS.ITEMS, itemSchema);
  };
}

export const flyffService = new FlyffService();
