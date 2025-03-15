import { Action } from 'src/types/action.js';
import { oneTimeAction } from './utils/one-time-action.js';

type ActionInTransaction = {
  action: Action;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataModel: any;
}

export class Transaction {
  private actions: ActionInTransaction[] = [];
  private undoableActions: ActionInTransaction[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  acceptAction(action: Action, dataModel: any) {
    const actionInTransaction = { action, dataModel };

    if (action.undoSupported()) {
      oneTimeAction(action);
      action.doAction(dataModel);
      this.undoableActions.push(actionInTransaction);
    }

    this.actions.push(actionInTransaction);
  }

  undoAll() {
    this.undoableActions.forEach(({ action, dataModel }) => action.undoAction(dataModel));
  }

  getActions() {
    return this.actions.map(({ action }) => action);
  }
}
