import { DefinePropertyRule } from '@wme-enhanced-sdk/sdk-patcher';
import { getWindow } from '@wme-enhanced-sdk/utils';
import { TransactionManager } from './transaction-manager.js';

let transactionManager: TransactionManager;

function getTransactionManager() {
  if (!transactionManager) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const window = getWindow<{ W: any }>();
    transactionManager = new TransactionManager(window.W.model.actionManager);
  }

  return transactionManager;
}

export default [
  new DefinePropertyRule(
    'Editing.beginTransaction',
    () => getTransactionManager().beginTransaction(),
  ),
  new DefinePropertyRule(
    'Editing.commitTransaction',
    (description?: string) => getTransactionManager().commitTransaction(description),
  ),
  new DefinePropertyRule(
    'Editing.cancelTransaction',
    () => getTransactionManager().cancelTransaction(),
  ),
  new DefinePropertyRule(
    'Editing.doActions',
    (cb: () => void, description?: string) => {
      const transactionManager = getTransactionManager();
      transactionManager.beginTransaction();
      try {
        cb();
        transactionManager.commitTransaction(description);
      } catch (e) {
        transactionManager.cancelTransaction();
        throw e;
      }
    }
  ),
];
