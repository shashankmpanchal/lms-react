// import { useAuthStore } from '@/store/store';

class CustomError extends Error {
  constructor(message, data) {
    super(message);
  }
}

const defaultHeaders = {
  'Content-Type': 'application/json'
};
export class ApiUtil {
  rootURL;
  stateValue;

  constructor() {
    this.rootURL = import.meta.env.VITE_API_URL ?? '';
  }

  async apiInvoke(url, method, body, headers, token) {
    let mainUrl = '';
    // const token = useAuthStore.getState().token;
    headers = headers || {};
    headers.Authorization = token ? `Bearer ${token}` : '';
    if (url.startsWith('/')) {
      // Remove first character from string url
      mainUrl = `${this.rootURL}${url.substring(1)}`;
    } else {
      mainUrl = `${this.rootURL}${url}`;
    }
    const r = await fetch(`${mainUrl}`, {
      method: method ?? 'GET',
      headers: {
        ...(headers ?? {})
      },
      body
    });

    const data = await r.json();
    const error = new CustomError(data?.message || 'Something went wrong', {});
    error.data = data;
    if (!r.ok) {
      throw error;
    }

    if (data.code > 299) {
      throw error;
    }

    // if (!data.status) {
    //   throw error;
    // }
    return data;
  }

  async get(url, token) {
    return this.apiInvoke(`${url}`, 'GET', undefined, defaultHeaders, token);
  }

  async post(url, data, token) {
    const headers = data instanceof FormData ? {} : defaultHeaders;
    const newData = data instanceof FormData ? data : JSON.stringify(data);
    return this.apiInvoke(`${url}`, 'POST', newData, headers, token);
  }

  async put(url, data, token) {
    const headers = data instanceof FormData ? {} : defaultHeaders;
    const newData = data instanceof FormData ? data : JSON.stringify(data);
    return this.apiInvoke(`${url}`, 'PUT', newData, headers, token);
  }

  async delete(url, data, token) {
    const headers = data instanceof FormData ? {} : defaultHeaders;
    const newData = data instanceof FormData ? data : JSON.stringify(data);
    return this.apiInvoke(`${url}`, 'DELETE', newData, headers, token);
  }
}