import { HttpClient } from '@/api/http-client';

class FlyffService {
  private readonly endpoints: Record<string, string> = {
    items: 'api/v1/shape/items',
  };

  public readonly httpClient: HttpClient;

  public readonly urls: Record<string, string>;

  constructor() {
    const baseUrl = import.meta.env.VITE_ELECTRIC_PROXY_BASE_URL;

    this.httpClient = new HttpClient({
      baseUrl,
      redirectUnauthorizedEndpoint: 'login',
      redirectCSRFEndpoint: 'sanctum/csrf-cookie',
      options: {
        credentials: 'include', // usage of sanctum in SPA mode
        timeout: 30_000, // higher than electric pulling 20s
      },
    });

    this.urls = {
      items: `${baseUrl}/${this.endpoints.items}`,
    };
  }
}

export const flyffService = new FlyffService();
