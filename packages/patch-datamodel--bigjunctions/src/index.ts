import { SdkPatcherRule } from '@wme-enhanced-sdk/sdk-patcher';
import addBigJunctionRules from './rules/add-big-junction.rules.js';
import configureArtifactsRules from './rules/configure-artifacts.rules.js';

export default [
  ...configureArtifactsRules,
  ...addBigJunctionRules,
] as SdkPatcherRule[];
