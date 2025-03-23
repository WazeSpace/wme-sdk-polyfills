import { getWindow } from '@wme-enhanced-sdk/utils';
import { FetchInterceptor } from './lib/fetch-interceptor.js';

export { FetchInterceptor };
export const defaultFetchInterceptor = new FetchInterceptor(getWindow());
