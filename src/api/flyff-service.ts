import { sprintf } from 'sprintf-js';
import { HttpClient } from '@/api/http-client';
import { type TxidResponse, txidResponseSchema } from '@/schemas/shared-schema';

class FlyffService {
  private readonly endpoints: Record<string, string> = {
    items: 'api/v1/shape/items',
    itemUsers: 'api/v1/shape/me/items',
    itemUser: 'api/v1/shape/me/items/%s',
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
      itemUsers: `${baseUrl}/${this.endpoints.itemUsers}`,
    };
  }

  async storeItemUser(payload: {
    item_id: string;
    favorite?: boolean;
    note?: string | null;
  }): Promise<TxidResponse> {
    try {
      const data = await this.httpClient.post(this.endpoints.itemUsers, {
        json: payload,
      });

      return txidResponseSchema.parse(data);
    } catch (error) {
      console.error('Failed to store item user:', error);
      throw error;
    }
  }

  async updateItemUser(
    itemId: string,
    payload: {
      favorite?: boolean;
      note?: string | null;
    },
  ): Promise<TxidResponse> {
    try {
      const endpoint = sprintf(this.endpoints.itemUser, itemId);
      const data = await this.httpClient.patch(endpoint, {
        json: payload,
      });

      return txidResponseSchema.parse(data);
    } catch (error) {
      console.error('Failed to update item user:', error);
      throw error;
    }
  }
}

export const flyffService = new FlyffService();
