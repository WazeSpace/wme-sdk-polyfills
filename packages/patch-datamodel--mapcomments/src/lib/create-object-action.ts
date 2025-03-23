/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWindow } from '@wme-enhanced-sdk/utils';

function createCreateObjectAction(object: any) {
  const window = getWindow<{ require(module: 'Waze/Action/CreateObject'): any }>();
  const CreateObject = window.require('Waze/Action/CreateObject');
  return new CreateObject(object);
}

export function pushCreateObjectAction(object: any) {
  const window = getWindow<{ W: any }>();
  window.W.model.actionManager.add(createCreateObjectAction(object));
}
