/* eslint-disable @typescript-eslint/no-explicit-any */
import { WmeSDK } from 'wme-sdk-typings';
import { PropertySwapper } from '@wme-enhanced-sdk/method-interceptor';
import { SdkPatcherRule } from './sdk-patcher-rule.js';

export interface DefinePropertyRuleOptions {
  onlyIfNotExists: boolean;
  isFactory: boolean;
}

const defaultOptions: DefinePropertyRuleOptions = {
  onlyIfNotExists: true,
  isFactory: false,
};

export class DefinePropertyRule implements SdkPatcherRule {
  private _installedInstances = new Map<WmeSDK, PropertySwapper>();

  private readonly _path: string[];
  private readonly _targetValue: any;
  private readonly _options: DefinePropertyRuleOptions;

  constructor(path: string, targetValue: any, options: Partial<DefinePropertyRuleOptions> = {}) {
    this._path = path.split('.');
    if (this._path.length === 0) throw new Error('Path must not be empty');

    this._targetValue = targetValue;
    this._options = { ...defaultOptions, ...options };
  }

  /**
   * Retrieves the target object to set the property on. If the path accesses a nested object that does not exist, it will be created.
   * @param instance The instance to retrieve the target object from.
   * @private
   */
  private _getTargetObject(instance: WmeSDK) {
    let targetObject: Record<string, any> = instance;
    for (const pathPart of this._path.slice(0, this._path.length - 1)) {
      if (!targetObject[pathPart]) targetObject[pathPart] = {};
      targetObject = targetObject[pathPart];
    }
    return targetObject;
  }

  private _createSwapper(instance: WmeSDK) {
    const targetObject = this._getTargetObject(instance);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return new PropertySwapper(targetObject, this._path.at(-1)!);
  }

  /**
   * Installs the hook on the given instance.
   * @param instance The instance to install the hook on.
   */
  install(instance: WmeSDK) {
    if (this._installedInstances.has(instance)) return;

    const swapper = this._createSwapper(instance);
    if (swapper.value && this._options.onlyIfNotExists) return;

    if (this._options.isFactory && typeof this._targetValue === 'function') {
      const value = this._targetValue({
        nativeSdkInstance: instance,
      });
      swapper.swap(value);
    } else {
      swapper.swap(this._targetValue);
    }
    this._installedInstances.set(instance, swapper);
  }

  /**
   * Uninstalls the hook from the given instance.
   * @param instance The instance to uninstall the hook from.
   */
  uninstall(instance: WmeSDK) {
    const swapper = this._installedInstances.get(instance);
    if (swapper) {
      swapper.restore();
      this._installedInstances.delete(instance);
    }
  }
}
