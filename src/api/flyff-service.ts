import { HttpClient } from '@/api/http-client';

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
  public getClasses = async () => {
    try {
      // TODO: add zod schema + return type
      const data = await this._httpClient.get(FlyffService.ENDPOINTS.CLASSES);

      return data;
    } catch (error: unknown) {
      throw new Error('An error occurred while getting items');
    }
  };

  /**
   * Items
   */
  public getItems = async () => {
    try {
      // TODO: add zod schema + return type
      const data = await this._httpClient.get(FlyffService.ENDPOINTS.ITEMS);
      return data;
    } catch (error: unknown) {
      throw new Error('An error occurred while getting items');
    }
  };
}

export const flyffService = new FlyffService();
