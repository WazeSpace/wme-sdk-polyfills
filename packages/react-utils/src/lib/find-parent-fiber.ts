import { Fiber } from 'react-reconciler';
import { getFiberProps } from './get-fiber-props.js';
import { AnyHook, parseFiberHooks, UseMemoHook, UseRefHook, UseStateHook } from './parse-fiber-hooks.js';

interface ParsedFiber {
  fiber: Fiber;
  hooks: {
    all: AnyHook[];
    useState: UseStateHook[];
    useMemo: UseMemoHook[];
    useRef: UseRefHook[];
  };
  props: Record<string, any>;
}

export function findParentFiber(
  startingFiber: Fiber,
  predicate: (fiber: ParsedFiber) => boolean,
  maxDepth = Infinity,
) {
  let currentFiber: Fiber | null = startingFiber;
  let depth = 0;

  while (currentFiber && depth < maxDepth) {
    const hooks = currentFiber.memoizedState ? parseFiberHooks(currentFiber) : [];
    const props = getFiberProps(currentFiber);

    const predicateSubject: ParsedFiber = {
      fiber: currentFiber,
      hooks: {
        all: hooks,
        useState: hooks.filter((hook): hook is UseStateHook => hook.type === 'useState'),
        useMemo: hooks.filter((hook): hook is UseMemoHook => hook.type === 'useMemo'),
        useRef: hooks.filter((hook): hook is UseRefHook => hook.type === 'useRef'),
      },
      props,
    };

    if (predicate(predicateSubject)) {
      return predicateSubject;
    }

    currentFiber = currentFiber.return;
    depth++;
  }

  return null;
}
