export interface MangolConfigView {
  projection: string;
  center: [number, number] | number[];
  zoom: number;
  resolutions?: number[];
  zoomDuration?: number;
  enableRotation?: boolean;
}
