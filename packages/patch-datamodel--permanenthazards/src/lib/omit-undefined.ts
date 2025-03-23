// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omitUndefined(object: Record<string, any>) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined));
}
