import {
  PropertySwapper,
} from '@wme-enhanced-sdk/method-interceptor';
import { getWindow } from '@wme-enhanced-sdk/utils';

export function captureActions(cb: () => void) {
  const actions: any[] = [];
  const methodSwapper = new PropertySwapper(getWindow<{ W: any }>().W.model.actionManager, 'add');
  methodSwapper.swap((action: any) => {
    actions.push(action);
  });

  try {
    cb();
  } finally {
    methodSwapper.restore();
  }

  return actions;
}
