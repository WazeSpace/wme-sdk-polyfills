import { Action } from '../types/action.js';
import { getWindow } from '@wme-enhanced-sdk/utils';
import { MultiAction } from '../types/multi-action.js';

function getMultiActionClass(): typeof MultiAction | null {
  try {
    const window = getWindow<{ require(module: 'Waze/Action/MultiAction'): typeof MultiAction }>();
    return window.require('Waze/Action/MultiAction');
  } catch {
    return null;
  }
}

export function createMultiAction(subActions?: Action[]) {
  const MultiAction = getMultiActionClass();
  if (!MultiAction) throw new Error('Unable to retrieve MultiAction');

  return new MultiAction(subActions);
}
