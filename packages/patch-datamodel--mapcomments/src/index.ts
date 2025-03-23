import { DefinePropertyRule, SdkPatcherRule } from '@wme-enhanced-sdk/sdk-patcher';
import { resolveEntityPrototype } from '@wme-enhanced-sdk/wme-utils';
import { point } from '@turf/helpers';
import { AddMapCommentArgs } from './lib/add-map-comments-args.js';
import { pushCreateObjectAction } from './lib/create-object-action.js';
import { formatEndDate } from './lib/format-end-date.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let MapComment: any;

function assertMapCommentResolved() {
  if (!MapComment)
    throw new Error('MapComment not initialized. Make sure to await the enhancedSDK function before using it.');
}

export default [
  {
    async install() {
      MapComment = await resolveEntityPrototype('mapComments', {
        geometry: point([0, 0]).geometry,
      });
    },
  } as SdkPatcherRule,

  new DefinePropertyRule('DataModel.MapComments.addMapComment', (args: AddMapCommentArgs) => {
    assertMapCommentResolved();

    const mapComment = new MapComment({
      geoJSONGeometry: args.geoJSONGeometry,
      subject: args.subject,
      body: args.body,
      lockRank: args.lockRank,
      endDate: args.endDate ? formatEndDate(args.endDate) : null,
    });
    pushCreateObjectAction(mapComment);
  }),
];
