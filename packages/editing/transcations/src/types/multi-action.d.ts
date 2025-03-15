/* eslint-disable @typescript-eslint/no-explicit-any */

import { Action } from './action.js';

export class MultiAction<P = any> extends Action<P> {
  /** The HigherOrder action takes care of additional stuff related to the action */
  static Base: typeof MultiAction<any>;
  protected subActions: Action[];

  constructor(subActions?: Action[], props?: P);

  doSubAction(dataModel: any, action: Action): void;
  getSubActions(): Action[];
}
