import { Polygon } from 'geojson';
import { RoadTypeId } from 'wme-sdk-typings';

export interface AddSchoolZoneArgs {
  geometry: Polygon;
  name?: string;
  speedLimit?: number;
  excludedRoadTypes: RoadTypeId[];
}
