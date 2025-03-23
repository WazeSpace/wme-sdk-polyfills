import { getWindow } from '@wme-enhanced-sdk/utils';
import { FetchInterceptor } from './lib/fetch-interceptor.js';

export { FetchInterceptor };
export const defaultFetchInterceptor = new FetchInterceptor(getWindow());

export * from './lib/should-intercept-loaders/index.js';
export * from './lib/create-response.js';
export * from './lib/create-json-response.js';
