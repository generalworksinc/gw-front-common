import { ofetch } from "ofetch";

export interface FetchOption {
  headers?: Record<string, string>;
  [key: string]: any;
}

const DEFAULT_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
};

export interface AuthTokenProvider {
  getAccessToken: () => Promise<string | null | undefined> | string | null | undefined;
}

export interface ApiBaseProvider {
  makeApiBase: () => string;
}

export const createSolidFetch = (
  base: ApiBaseProvider,
  auth?: AuthTokenProvider,
  extraHeaders?: Record<string, string>
) => {
  const API_BASE = () => base.makeApiBase();

  const withAuthHeaders = async () => {
    const token = auth ? await auth.getAccessToken() : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const $fetchGet = async <T = any>(url: string, params: Record<string, any> = {}, option: FetchOption = {}): Promise<T> => {
    const headers = Object.assign({}, DEFAULT_HEADERS, await withAuthHeaders(), extraHeaders || {}, option.headers || {});

    // クエリ付与
    const q = new URLSearchParams();
    for (const k of Object.keys(params || {})) {
      const v = params[k];
      if (v == null) continue;
      q.append(k, String(v));
    }
    if ([...q.keys()].length > 0) {
      url += (url.includes("?") ? "&" : "?") + q.toString();
    }

    return ofetch(API_BASE() + url, { method: "GET", headers, ...option }) as Promise<T>;
  };

  const $fetchPost = async <T = any>(url: string, data: Record<string, any> = {}, option: FetchOption = {}): Promise<T> => {
    const headers = Object.assign({}, DEFAULT_HEADERS, await withAuthHeaders(), extraHeaders || {}, option.headers || {});
    return ofetch(API_BASE() + url, { method: "POST", headers, body: data, ...option }) as Promise<T>;
  };

  return { $fetchGet, $fetchPost };
};
