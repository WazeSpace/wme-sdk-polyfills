import { LoggerableMethodInterceptor } from '@wme-enhanced-sdk/method-interceptor';
import { Transaction } from './transaction.js';
import { ActionManager } from './types/action-manager.js';
import { createMultiAction } from './utils/create-multi-action.js';

export class TransactionManager {
  private _activeTransaction: Transaction | null = null;
  private _actionManagerAddInterceptor: LoggerableMethodInterceptor<ActionManager, 'add'>;

  constructor(actionManager: ActionManager) {
    this._actionManagerAddInterceptor = new LoggerableMethodInterceptor(
      actionManager,
      'add',
      (_invoke, action) => {
        this._activeTransaction?.acceptAction?.(action, actionManager.dataModel);
        return true;
      },
    );
  }

  private openTransaction() {
    this._activeTransaction = new Transaction();
  }

  private closeTransaction() {
    const transaction = this._activeTransaction;
    this._activeTransaction = null;
    this._actionManagerAddInterceptor.flushLoggedRequests();
    return transaction;
  }

  private get hasTransaction() {
    return this._activeTransaction !== null;
  }

  beginTransaction() {
    this.openTransaction();
  }

  commitTransaction(description?: string) {
    if (!this.hasTransaction) throw new Error('No open transaction found');

    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const actions = this._activeTransaction!.getActions();
      const multiAction = createMultiAction(actions);
      if (description) multiAction._description = description;
      this._actionManagerAddInterceptor.callOriginalInvocator(multiAction);
    } catch {
      // if we failed to add our multi-action, this might be due to a lot of reasons
      // so at least, add them in their original manner with their original arguments
      this._actionManagerAddInterceptor.executeOriginalLoggedRequests();
    } finally {
      this.closeTransaction();
    }
  }

  cancelTransaction() {
    this._activeTransaction?.undoAll();
    this.closeTransaction();
  }
}
