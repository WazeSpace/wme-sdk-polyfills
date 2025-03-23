import { Point, Polygon } from 'geojson';

export interface AddMapCommentArgs {
  geoJSONGeometry: Point | Polygon;
  subject?: string;
  body?: string;
  lockRank?: number;
  endDate?: Date;
}
