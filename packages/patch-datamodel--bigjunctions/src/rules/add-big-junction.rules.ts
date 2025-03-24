import { DefinePropertyRule, SdkPatcherRule, SdkPatcherRuleOperationArgs } from '@wme-enhanced-sdk/sdk-patcher';
import { Polygon } from 'geojson';
import { ADD_BIG_JUNCTION_ACTION, BIG_JUNCTION_DM } from '../artifact-symbols.js';
import { createBigJunction } from '../utils/create-big-junction.js';

interface AddBigJunctionArgs {
  geometry: Polygon;
}

export default [
  new DefinePropertyRule('DataModel.BigJunctions.addBigJunction', ({ artifacts }: SdkPatcherRuleOperationArgs) => {
    return (args: AddBigJunctionArgs) => {
      const bigJunction = createBigJunction(
        artifacts[BIG_JUNCTION_DM],
        artifacts[ADD_BIG_JUNCTION_ACTION],
        {
          geoJSONGeometry: args.geometry,
        },
      );
      return bigJunction.getID();
    };
  }, { isFactory: true }),
] as SdkPatcherRule[];