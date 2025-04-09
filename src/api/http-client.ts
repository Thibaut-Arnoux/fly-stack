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
        afterResponse: [this.handleError],
      },
    });
  }

  public get = async <T>(endpoint: string, options?: Options) => {
    return this._httpClient.get<T>(endpoint, options).json();
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
    } catch (err) {
      return false;
    }
  }
}
