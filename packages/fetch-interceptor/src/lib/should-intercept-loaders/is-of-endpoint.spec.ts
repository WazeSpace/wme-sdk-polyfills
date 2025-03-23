import { isOfEndpoint } from './is-of-endpoint.js';

function mockLocation(href: string) {
  const url = new URL(href) as unknown as Location;
  url.assign = vi.fn();
  url.reload = vi.fn();
  url.replace = vi.fn();

  vi.spyOn(window, 'location', 'get').mockReturnValue(url);
}

describe('isOfEndpoint', () => {
  beforeEach(() => {
    mockLocation('http://another-example.com');
  });

  it('returns true for matching string URL', () => {
    const shouldIntercept = isOfEndpoint('http://example.com/api/endpoint');
    expect(shouldIntercept('http://example.com/api/endpoint')).toBe(true);
  });

  it('returns false for non-matching string URL', () => {
    const shouldIntercept = isOfEndpoint('http://example.com/api/endpoint');
    expect(shouldIntercept('http://example.com/api/other')).toBe(false);
  });

  it('returns true for matching URL object', () => {
    const shouldIntercept = isOfEndpoint(new URL('http://example.com/api/endpoint'));
    expect(shouldIntercept(new URL('http://example.com/api/endpoint'))).toBe(true);
  });

  it('returns false for non-matching URL object', () => {
    const shouldIntercept = isOfEndpoint(new URL('http://example.com/api/endpoint'));
    expect(shouldIntercept(new URL('http://example.com/api/other'))).toBe(false);
  });

  it('returns true for matching Request object', () => {
    const shouldIntercept = isOfEndpoint('http://example.com/api/endpoint');
    expect(shouldIntercept(new Request('http://example.com/api/endpoint'))).toBe(true);
  });

  it('returns false for non-matching Request object', () => {
    const shouldIntercept = isOfEndpoint('http://example.com/api/endpoint');
    expect(shouldIntercept(new Request('http://example.com/api/other'))).toBe(false);
  });

  it('handles relative URLs correctly', () => {
    const shouldIntercept = isOfEndpoint('/api/endpoint');
    expect(shouldIntercept('http://example.com/api/endpoint')).toBe(true);
  });

  it('handles different base URLs correctly', () => {
    mockLocation('http://another-example.com');
    const shouldIntercept = isOfEndpoint('/api/endpoint');
    expect(shouldIntercept('http://another-example.com/api/endpoint')).toBe(true);
  });
});
