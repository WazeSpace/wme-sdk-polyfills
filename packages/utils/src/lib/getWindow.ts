export function getWindow<W extends object>(): Window & typeof globalThis & W {
  if ('unsafeWindow' in window)
    return window.unsafeWindow as Window & typeof globalThis & W;
  return window as Window & typeof globalThis & W;
}
