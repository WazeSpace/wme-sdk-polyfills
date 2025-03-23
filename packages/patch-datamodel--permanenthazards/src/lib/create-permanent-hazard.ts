/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWindow } from '@wme-enhanced-sdk/utils';

export function createPermanentHazard(PermanentHazard: any, AddPermanentHazard: any, attributes: any) {
  const permanentHazard = new PermanentHazard(attributes);
  const addPermanentHazard = new AddPermanentHazard(permanentHazard);

  const window = getWindow<{ W: any }>();
  window.W.model.actionManager.add(addPermanentHazard);
  return permanentHazard;
}
