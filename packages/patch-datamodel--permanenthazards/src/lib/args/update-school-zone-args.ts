import { Polygon } from 'geojson';
import { RoadTypeId } from 'wme-sdk-typings';

export interface UpdateSchoolZoneArgs {
  schoolZoneId: number;
  geometry?: Polygon;
  name?: string;
  speedLimit?: number;
  excludedRoadTypes?: RoadTypeId[];
}
