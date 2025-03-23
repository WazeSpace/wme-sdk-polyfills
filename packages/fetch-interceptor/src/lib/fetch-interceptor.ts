import { MethodInterceptor } from '@wme-enhanced-sdk/method-interceptor';

export interface InterceptionFilter {
  shouldIntercept(requestInput: RequestInfo | URL, requestInit?: RequestInit): boolean;
  intercept(requestInput: RequestInfo | URL, requestInit?: RequestInit): Promise<Response>;
  shouldKeep?: boolean | ((requestInput: RequestInfo | URL, requestInit?: RequestInit) => boolean);
}

export class FetchInterceptor {
  private readonly _fetchInterceptor: MethodInterceptor<Window, 'fetch'>;
  private readonly _interceptionFilters = new Set<InterceptionFilter>();

  constructor(targetWindow: Window) {
    this._fetchInterceptor = new MethodInterceptor(targetWindow, 'fetch', (invoke, requestInput, requestInit) => {
      for (const filter of this._interceptionFilters) {
        if (!filter.shouldIntercept(requestInput, requestInit)) continue;
        if (!this.shouldKeepFilter(filter, requestInput, requestInit))
          this.removeInterceptionFilter(filter);
        return filter.intercept(requestInput, requestInit);
      }

      return invoke(requestInput, requestInit);
    });
  }

  enable() {
    this._fetchInterceptor.enable();
  }

  disable() {
    this._fetchInterceptor.disable();
  }

  addInterceptionFilter(filter: InterceptionFilter) {
    this.enable();
    this._interceptionFilters.add(filter);
  }

  removeInterceptionFilter(filter: InterceptionFilter) {
    this._interceptionFilters.delete(filter);
  }

  private shouldKeepFilter(filter: InterceptionFilter, requestInput: RequestInfo | URL, requestInit?: RequestInit): boolean {
    if (typeof filter.shouldKeep === 'function') return filter.shouldKeep(requestInput, requestInit);
    if (typeof filter.shouldKeep === 'boolean') return filter.shouldKeep;
    return false;
  }
}
