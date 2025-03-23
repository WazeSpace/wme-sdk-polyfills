import { getWindow } from '@wme-enhanced-sdk/utils';

export function getMapComment(mapCommentId: string | number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const window = getWindow<{ W: any }>();
  return window.W.model.mapComments.getObjectById(mapCommentId);
}
