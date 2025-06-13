import type { LinkHeader } from '@/types/api';
import ky, {
  type KyInstance,
  type KyRequest,
  type KyResponse,
  type NormalizedOptions,
  type Options,
} from 'ky';

export class HttpClient {
  private _baseUrl: URL;

  private _headers: HeadersInit;

  private _httpClient: KyInstance;

  constructor({
    baseUrl,
    headers,
  }: {
    baseUrl: string;
    headers?: HeadersInit;
  }) {
    if (!this.isValidHttpUrl(baseUrl)) throw new Error('Invalid base url');

    this._baseUrl = new URL(baseUrl);
    this._headers = headers || {};
    this._httpClient = ky.create({
      prefixUrl: this._baseUrl,
      headers: this._headers,
      hooks: {
        afterResponse: [this.handlePagination, this.handleError],
      },
    });
  }

  public get = async <T>(endpoint: string, options?: Options) => {
    return this._httpClient.get<T>(endpoint, options).json();
  };

  /**
   * @see https://joshgoestoflatiron.medium.com/february-10-pagination-in-a-json-server-api-with-the-link-header-dea63eb0a835
   */
  private parseLinkHeader = (linkHeader: string): LinkHeader => {
    const linkHeadersArray = linkHeader
      .split(', ')
      .map((header) => header.split('; '));
    const linkHeadersMap = linkHeadersArray.map((header) => {
      const thisHeaderRel = header[1].replace(/"/g, '').replace('rel=', '');
      const thisHeaderUrl = new URL(header[0].slice(1, -1));
      const thisPageValue = Number(thisHeaderUrl.searchParams.get('_page'));

      return [thisHeaderRel, thisPageValue];
    });

    return Object.fromEntries(linkHeadersMap);
  };

  /**
   * Use to handle the downgrade version of json-server from 1.0 to 0.17
   * Many things does not work on the beta version sort, like, ...
   * This allow to keep the same format provided in version 1.0
   */
  private handlePagination = async (
    _request: KyRequest,
    _options: NormalizedOptions,
    response: KyResponse,
  ) => {
    if (!response.headers.has('x-total-count') || !response.headers.has('link'))
      return;

    const total = response.headers.get('x-total-count');
    const link = response.headers.get('link');
    const parseLinkHeader = link
      ? this.parseLinkHeader(link)
      : { first: 1, last: 1 };

    const data = await response.json();
    const pagination = {
      prev: null,
      next: null,
      items: Number(total),
      pages: parseLinkHeader.last - parseLinkHeader.first + 1,
      ...parseLinkHeader,
    };

    return new Response(JSON.stringify({ data, ...pagination }), response);
  };

  private handleError = (
    _request: KyRequest,
    _options: NormalizedOptions,
    response: KyResponse,
  ) => {
    if (!response.ok)
      throw new Error(`Request failed with status: ${response.status}`);
  };

  private isValidHttpUrl(url: string) {
    try {
      const newUrl = new URL(url);

      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (_err) {
      return false;
    }
  }
}
