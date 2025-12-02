import ky, {
  type KyInstance,
  type KyRequest,
  type KyResponse,
  type NormalizedOptions,
  type Options,
} from 'ky';

export class HttpClient {
  protected readonly _baseUrl: URL;

  protected readonly _redirectUnauthorizedEndpoint?: string;

  protected readonly _redirectCSRFEndpoint?: string;

  private readonly _httpClient: KyInstance;

  constructor({
    baseUrl,
    redirectUnauthorizedEndpoint,
    redirectCSRFEndpoint,
    options,
  }: {
    baseUrl: string;
    redirectUnauthorizedEndpoint?: string;
    redirectCSRFEndpoint?: string;
    options?: Omit<Options, 'prefixUrl' | 'hooks'>;
  }) {
    if (!this._isValidHttpUrl(baseUrl)) throw new Error('Invalid base url');

    this._baseUrl = new URL(baseUrl);
    this._redirectUnauthorizedEndpoint = redirectUnauthorizedEndpoint;
    this._redirectCSRFEndpoint = redirectCSRFEndpoint;
    this._httpClient = ky.create({
      prefixUrl: this._baseUrl,
      hooks: {
        beforeRequest: [this._handleXSRFToken],
        afterResponse: [this._handleError],
      },
      ...options,
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

  private _getCookie(name: string): string | null {
    const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
  }

  private _handleXSRFToken = async (
    request: KyRequest,
    _options: NormalizedOptions,
  ) => {
    const token = this._getCookie('XSRF-TOKEN');
    if (token) request.headers.set('X-XSRF-TOKEN', decodeURIComponent(token));
  };

  private _handleError = async (
    _request: KyRequest,
    _options: NormalizedOptions,
    response: KyResponse,
  ) => {
    if (!response.ok)
      switch (response.status) {
        case 401:
          if (this._redirectUnauthorizedEndpoint) {
            await this._httpClient.post(this._redirectUnauthorizedEndpoint);

            return this._httpClient(_request, _options);
          }

          break;
        case 419:
          if (this._redirectCSRFEndpoint) {
            await this._httpClient.get(this._redirectCSRFEndpoint);

            return this._httpClient(_request, _options);
          }

          break;
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
