import { getWindow } from '@wme-enhanced-sdk/utils';

export function getPermanentHazard(permanentHazardId: string | number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const window = getWindow<{ W: any }>();
  return window.W.model.permanentHazards.getObjectById(permanentHazardId);
}
