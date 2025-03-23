import { fetchInterceptor } from './fetch-interceptor.js';

describe('fetchInterceptor', () => {
  it('should work', () => {
    expect(fetchInterceptor()).toEqual('fetch-interceptor');
  });
});
