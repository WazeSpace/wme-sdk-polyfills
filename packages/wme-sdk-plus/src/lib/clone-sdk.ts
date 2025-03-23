import { WmeSDK } from 'wme-sdk-typings';
import { getResultForVersion, separateVersionComponents } from './version-comparator.js';

const clonersByVersion: Record<string, (sdk: WmeSDK) => WmeSDK> = {
  '0.1': (sdk: WmeSDK) => {
    const WmeSDK = sdk.constructor as new (id: string, name: string) => WmeSDK;
    return new WmeSDK(sdk.getScriptId(), sdk.getScriptName());
  }
}

export function cloneSdk(sdk: WmeSDK) {
  const cloners = Object.entries(clonersByVersion).map(([version, cloner]) => {
    return {
      version: separateVersionComponents(version),
      cloner,
    };
  });

  const { cloner } = getResultForVersion(
    {
      highest: sdk.getSDKVersion(),
    },
    cloners
  );

  return cloner(sdk);
}
