import { HttpClient } from '@/api/http-client';

class FlyffElectricService extends HttpClient {
  private readonly endpoints = {
    items: 'api/v1/shape/items',
  };

  public readonly urls = {
    items: this._baseUrl + this.endpoints.items,
  };

  constructor() {
    super({
      baseUrl: import.meta.env.VITE_ELECTRIC_PROXY_BASE_URL,
      redirectUnauthorizedEndpoint: 'login',
      redirectCSRFEndpoint: 'sanctum/csrf-cookie',
    });
  }
}

export const flyffElectricService = new FlyffElectricService();
