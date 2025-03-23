import { sdkPatcher } from './sdk-patcher.js';

describe('sdkPatcher', () => {
  it('should work', () => {
    expect(sdkPatcher()).toEqual('sdk-patcher');
  });
});
