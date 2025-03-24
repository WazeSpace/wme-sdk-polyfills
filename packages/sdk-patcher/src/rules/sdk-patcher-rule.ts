import { WmeSDK } from 'wme-sdk-typings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Artifacts = Record<symbol | string, any>;

export interface SdkPatcherRuleOperationArgs {
  sdk: WmeSDK;
  artifacts: Artifacts;
}

export interface SdkPatcherRule {
  install(args: SdkPatcherRuleOperationArgs): void | Artifacts | Promise<void | Artifacts>;
  uninstall?(args: SdkPatcherRuleOperationArgs): void | Artifacts | Promise<void | Artifacts>;
}
