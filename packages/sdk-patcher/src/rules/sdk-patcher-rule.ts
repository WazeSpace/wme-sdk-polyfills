import { WmeSDK } from 'wme-sdk-typings';

export interface SdkPatcherRule {
  install(sdk: WmeSDK): void | Promise<void>;
  uninstall?(sdk: WmeSDK): void | Promise<void>;
}
