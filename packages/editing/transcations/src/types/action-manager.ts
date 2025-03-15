/* eslint-disable @typescript-eslint/no-explicit-any */

import { Action } from './action.js';

export interface ActionManager {
  dataModel: any;
  add(action: Action): boolean;
}
