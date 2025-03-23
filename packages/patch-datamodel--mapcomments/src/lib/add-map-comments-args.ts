import { Point, Polygon } from 'geojson';

export interface AddMapCommentArgs {
  geometry: Point | Polygon;
  subject?: string;
  body?: string;
  lockRank?: number;
  endDate?: Date;
}
