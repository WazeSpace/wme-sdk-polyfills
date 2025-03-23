import { methodInterceptor } from './method-interceptor.js';

describe('methodInterceptor', () => {
  it('should work', () => {
    expect(methodInterceptor()).toEqual('method-interceptor');
  });
});
