import { SdkPatcher } from '@wme-enhanced-sdk/sdk-patcher';
import { WmeSDK } from 'wme-sdk-typings';
import allHooks from './lib/hooks-list.js';
import { cloneSdk } from './lib/clone-sdk.js';

const hooksManager = new SdkPatcher(allHooks);

interface Options {
  hooks?: string[];
  immutable?: boolean;
}

export default async function initWmeSdkPlus(sdk: WmeSDK, options: Options = {}) {
  if (options.immutable) {
    sdk = cloneSdk(sdk);
  }

  if (!sdk.State.isInitialized())
    await sdk.Events.once({ eventName: "wme-initialized" });

  if (options.hooks) {
    for (const hook of options.hooks) {
      await hooksManager.installHook(hook, sdk);
    }
  } else {
    await hooksManager.installAllHooks(sdk);
  }

  return sdk;
}
