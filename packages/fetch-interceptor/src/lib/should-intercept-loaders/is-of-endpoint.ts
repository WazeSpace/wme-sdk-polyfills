import { InterceptionFilter } from '../fetch-interceptor.js';
import { getWindow } from '@wme-enhanced-sdk/utils';

/**
 * Generates a function that checks if the request URL matches the specified endpoint URL.
 * This function can be used as a filter in the FetchInterceptor to determine
 * whether to intercept a request based on its URL.
 * @remarks It compares only the pathname of the URL, ignoring the protocol, host, and query parameters.
 * @param endpointUrl - The URL or string representation of the URL to match against.
 * @returns A function that takes a request input (string, URL, or Request) and returns true if the request URL matches the endpoint URL.
 */
export function isOfEndpoint(endpointUrl: string | URL): InterceptionFilter['shouldIntercept'] {
  endpointUrl = endpointUrl instanceof URL ? endpointUrl : new URL(endpointUrl, getWindow().location.href);
  return (requestInput) => {
    if (typeof requestInput === 'string') {
      const targetUrl = new URL(requestInput, getWindow().location.href);
      return targetUrl.pathname === endpointUrl.pathname;
    } else if (requestInput instanceof URL) {
      return requestInput.pathname === endpointUrl.pathname;
    } else {
      const targetUrl = new URL(requestInput.url, getWindow().location.href);
      return targetUrl.pathname === new URL(endpointUrl, getWindow().location.href).pathname;
    }
  }
}
