import { createResponse } from './create-response.js';

export function createJsonResponse<T>(
  requestPath: string,
  payload: T,
): Response {
  const body = JSON.stringify(payload);
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  return createResponse(requestPath, body, { headers });
}
