interface Options {
  method?: 'GET' | 'POST';
  params?: Record<string, string>;
  to: 'self' | 'out';
  cache?: RequestCache;
  body?: Record<string, string>;
}

export type ApiResponse<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; error: string };

class Fetch {
  private domain: string = process.env.NEXT_PUBLIC_BASE_URL || '';
  private api: string = process.env.NEXT_PUBLIC_API_URL || '';

  constructor() {
    if (!(this.api.length > 1) || !(this.domain.length > 1)) {
      console.warn('Missing environment variables: NEXT_PUBLIC_API_URL or NEXT_PUBLIC_BASE_URL');
      return;
    }
  }

  private getBase(direction: string) {
    if (direction == 'self' && typeof window !== 'undefined') {
      return '/api/';
    }
    return direction == 'self' ? (this.domain.includes('api/') ? this.domain : this.domain + 'api/') : this.api
  }

  private doURL(endpoint: string, params?: Record<string, string>) {
    if(endpoint.includes("http")) {
      const url = new URL(endpoint);
      if (params)
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
      return url
    } else {
      let url = endpoint;
      if (params) {
        url += "?"
        Object.entries(params).forEach(([key, value]) => url += `${key}=${value}`);
      }
      return url;
    }
  }

  private getFetchOptions(data: Options): RequestInit {
    const options: RequestInit = {
      method: data.method || 'GET',
      cache: data.cache,
      next: {
        revalidate: 1000 * 60 * 5,
      },
    };

    if (data.method === 'POST' && data.body) {
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const formData = new URLSearchParams();
      Object.entries(data.body).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      formData.toString();
      options.body = formData;

      console.log(options.body);
    }

    return options;
  }

  async fetch<T>(route: string, data: Options): Promise<ApiResponse<T>> {
    const direction = this.getBase(data.to)
    const url = this.doURL(direction + route, data.params);

    const options = this.getFetchOptions(data);
    const request = await fetch(url, options);

    if (!request.ok) {
      const error_message = {
        ok: false,
        status: 500,
        error: 'failed to fetch ' + url,
      } as const;
      console.error(error_message);
      return error_message;
    }

    const response = await request.json();
    return { ok: true, status: 200, data: response } as ApiResponse<T>;
  }
}

const FI = new Fetch();
export default FI;
