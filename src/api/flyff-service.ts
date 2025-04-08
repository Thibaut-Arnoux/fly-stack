import { HttpClient } from '@/api/http-client';
import { type Class, classesSchema } from '@/schemas/class';
import { type PaginatedItems, paginatedItemsSchema } from '@/schemas/item';

class FlyffService {
  private _httpClient: HttpClient;

  static readonly ENDPOINTS = {
    CLASSES: 'classes',
    ITEMS: 'items',
  } as const;

  constructor() {
    this._httpClient = new HttpClient({
      baseUrl: import.meta.env.VITE_PROXY_FLYFF_API_BASE_URL,
    });
  }

  /**
   * Classes
   */
  public getClasses = async (): Promise<Class[]> => {
    try {
      const data = await this._httpClient.get(FlyffService.ENDPOINTS.CLASSES);

      return classesSchema.parse(data);
    } catch (error: unknown) {
      throw new Error('An error occurred while getting classes');
    }
  };

  /**
   * Items
   */
  public getItems = async (): Promise<PaginatedItems> => {
    try {
      // TODO: map all options params (pages, per_page, sort, etc...)
      const data = await this._httpClient.get(
        `${FlyffService.ENDPOINTS.ITEMS}?_page=1`,
      );

      return paginatedItemsSchema.parse(data);
    } catch (error: unknown) {
      throw new Error('An error occurred while getting items');
    }
  };
}

export const flyffService = new FlyffService();
