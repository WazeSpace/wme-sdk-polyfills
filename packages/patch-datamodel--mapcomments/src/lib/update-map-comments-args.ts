import { Point, Polygon } from 'geojson';
import { MapComment } from 'wme-sdk-typings';

export interface UpdateMapCommentsArgs {
  mapCommentId: MapComment['id'];
  geometry?: Polygon | Point;
  subject?: string;
  body?: string;
  lockRank?: number;
}