/**
 * Creates a {@link Response} object with custom body and headers
 * @param requestPath The URL path initiated the request
 * @param body Raw body content to use in the response
 * @param init Any additional initialization parameters to use for the response
 */
export function createResponse(
  requestPath: string,
  body?: BodyInit | null,
  init?: ResponseInit,
): Response {
  const response = new Response(body, init);

  const requestUrl = new URL(requestPath, location.toString());
  Object.defineProperty(response, 'url', { value: requestUrl });

  return response;
}
