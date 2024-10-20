import { useState, useCallback } from 'react';

// Define types for the hook
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type FetchError = string | null;

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: FetchError;
  get: (url: string, headers?: HeadersInit) => Promise<T | void>;
  post: (url: string, body: any, headers?: HeadersInit) => Promise<T | void>;
  patch: (url: string, body: any, headers?: HeadersInit) => Promise<T | void>;
  del: (url: string, headers?: HeadersInit) => Promise<T | void>;
}

const useFetch = <T>(baseURL: string): UseFetchReturn<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchError>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(
    async (url: string, method: RequestMethod = 'GET', body: any = null, headers: HeadersInit = {}): Promise<T | void> => {
      setLoading(true);
      setError(null);
      try {
        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        };

        if (body) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(`${baseURL}${url}`, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: T = await response.json();
        setData(result);
        return result;
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [baseURL]
  );

  const get = useCallback((url: string, headers: HeadersInit = {}): Promise<T | void> => fetchData(url, 'GET', null, headers), [fetchData]);
  const post = useCallback((url: string, body: any, headers: HeadersInit = {}): Promise<T | void> => fetchData(url, 'POST', body, headers), [fetchData]);
  const patch = useCallback((url: string, body: any, headers: HeadersInit = {}): Promise<T | void> => fetchData(url, 'PATCH', body, headers), [fetchData]);
  const del = useCallback((url: string, headers: HeadersInit = {}): Promise<T | void> => fetchData(url, 'DELETE', null, headers), [fetchData]);

  return { data, loading, error, get, post, patch, del };
};

export default useFetch;
