/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWindow } from '@wme-enhanced-sdk/utils';

export function createBigJunction(BigJunction: any, AddBigJunction: any, attributes: any) {
  const bigJunction = new BigJunction(attributes);
  const addBigJunction = new AddBigJunction(bigJunction);

  const window = getWindow<{ W: any }>();
  window.W.model.actionManager.add(addBigJunction);
  return bigJunction;
}
