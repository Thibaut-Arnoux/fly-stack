import ky, {
  type KyInstance,
  type KyRequest,
  type KyResponse,
  type NormalizedOptions,
  type Options,
} from 'ky';
import type { LinkHeader } from '@/types/api';

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
    if (!this._isValidHttpUrl(baseUrl)) throw new Error('Invalid base url');

    this._baseUrl = new URL(baseUrl);
    this._headers = headers || {};
    this._httpClient = ky.create({
      prefixUrl: this._baseUrl,
      headers: this._headers,
      credentials: 'include',
      timeout: 30_000, // higher than electric pulling 20s
      hooks: {
        beforeRequest: [this._handleXSRFToken],
        afterResponse: [this._handlePagination, this._handleError],
      },
    });
  }

  public asFetch: typeof fetch = (input, init) => {
    // @see : https://github.com/sindresorhus/ky?tab=readme-ov-file#input
    if (typeof input === 'string') input = new Request(input);
    return this._httpClient(input, init);
  };

  public get = async <T>(endpoint: string, options?: Options) => {
    return this._httpClient.get<T>(endpoint, options).json();
  };

  public post = async <T>(endpoint: string, options?: Options) => {
    return this._httpClient.post<T>(endpoint, options).json();
  };

  /**
   * @see https://joshgoestoflatiron.medium.com/february-10-pagination-in-a-json-server-api-with-the-link-header-dea63eb0a835
   */
  private _parseLinkHeader = (linkHeader: string): LinkHeader => {
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

  private _getCookie(name: string): string | null {
    const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
  }

  private _handleXSRFToken = async (
    request: KyRequest,
    options: NormalizedOptions,
  ) => {
    const token = this._getCookie('XSRF-TOKEN');
    if (token) request.headers.set('X-XSRF-TOKEN', decodeURIComponent(token));
  };

  /**
   * Use to handle the downgrade version of json-server from 1.0 to 0.17
   * Many things does not work on the beta version sort, like, ...
   * This allow to keep the same format provided in version 1.0
   */
  private _handlePagination = async (
    _request: KyRequest,
    _options: NormalizedOptions,
    response: KyResponse,
  ) => {
    if (!response.headers.has('x-total-count') || !response.headers.has('link'))
      return;

    const total = response.headers.get('x-total-count');
    const link = response.headers.get('link');
    const parseLinkHeader = link
      ? this._parseLinkHeader(link)
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

  private _handleError = async (
    _request: KyRequest,
    _options: NormalizedOptions,
    response: KyResponse,
  ) => {
    if (!response.ok)
      switch (response.status) {
        case 401:
          await this._httpClient.post('login');

          return this._httpClient(_request, _options);
        case 419:
          await this._httpClient.get('sanctum/csrf-cookie');

          return this._httpClient(_request, _options);
        default:
          throw new Error(`Request failed with status: ${response.status}`);
      }
  };

  private _isValidHttpUrl(url: string) {
    try {
      const newUrl = new URL(url);

      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (_err) {
      return false;
    }
  }
}
