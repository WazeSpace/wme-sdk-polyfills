import { Action } from '../types/action.js';
import { MethodInterceptor } from '@wme-enhanced-sdk/method-interceptor';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ExecutionResultStore<Fn extends (...args: any[]) => any> {
  private _hasResult = false;
  private result: ReturnType<Fn> | undefined = undefined;

  /**
   * Stores the given result and marks the store as it has a result
   * @param result The result to store
   * @returns The same provided {@link result}
   */
  store(result: ReturnType<Fn>) {
    this.result = result;
    this._hasResult = true;
    return result;
  }

  /**
   * Clears the set
   */
  clear() {
    this.result = undefined;
    this._hasResult = false;
  }

  /**
   * Retrieves the result, if any, from the store
   * @returns The result stored in the store
   * @throws An error when there is no result stored
   */
  getResult(): ReturnType<Fn> {
    if (!this.hasResult)
      throw new Error('No result is stored');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.result!;
  }

  /**
   * Indicates whether there is a stored result or no
   */
  get hasResult() {
    return this._hasResult;
  }
}

/**
 * A rule that ensures the given action won't be executed multiple times
 * @param action The action to enforce this rule on
 */
export function oneTimeAction(action: Action) {
  const executionResult = new ExecutionResultStore<Action['doAction']>();

  new MethodInterceptor(
    action,
    'doAction',
    (invoke, ...args) => {
      if (executionResult.hasResult) return executionResult.getResult();

      return executionResult.store(invoke(...args));
    },
  ).enable();

  new MethodInterceptor(
    action,
    'undoAction',
    (invoke, ...args) => {
      const result = invoke(...args);
      executionResult.clear();
      return result;
    }
  ).enable();
}
