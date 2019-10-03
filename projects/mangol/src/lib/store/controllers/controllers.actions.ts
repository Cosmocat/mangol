import { createAction, props } from '@ngrx/store';
import {
  MangolControllersFullScreenDictionary,
  MangolControllersPositionDictionary,
  MangolControllersRotationDictionary,
  MangolControllersScalebarOptions,
  MangolControllersZoomDictionary
} from '../../interfaces/config-map-controllers.interface';

export const reset = createAction(
  '[Controllers] Reset'
);

export const setShowZoom = createAction(
  '[Controllers] Set Show Zoom',
  props<{ showZoom: boolean }>()
);

export const setZoomDictionary = createAction(
  '[Controllers] Set Zoom Dictionary',
  props<{ zoomDictionary: MangolControllersZoomDictionary }>()
);

export const setZoomShowTooltip = createAction(
  '[Controllers] Set Zoom Show Tooltip',
  props<{ zoomShowTooltip: boolean }>()
);

export const setScalebar = createAction(
  '[Controllers] Set Scalebar',
  props<{ scalebar: MangolControllersScalebarOptions }>()
);

export const setShowPosition = createAction(
  '[Controllers] Set Show Position',
  props<{ showPosition: boolean }>()
);

export const setPositionPrecision = createAction(
  '[Controllers] Set Position Precision',
  props<{ positionPrecision: number }>()
);

export const setPositionCoordinates = createAction(
  '[Controllers] Set Position Coordinates',
  props<{ positionCoordinates: [number, number] }>()
);

export const setPositionDictionary = createAction(
  '[Controllers] Set Position Dictionary',
  props<{ positionDictionary: MangolControllersPositionDictionary }>()
);

export const setShowRotation = createAction(
  '[Controllers] Set Show Rotation',
  props<{ showRotation: boolean }>()
);

export const setRotationDictionary = createAction(
  '[Controllers] Set Rotation Dictionary',
  props<{ rotationDictionary: MangolControllersRotationDictionary }>()
);

export const setShowRotationTooltip = createAction(
  '[Controllers] Set Show Rotation Tooltip',
  props<{ showRotationTooltip: boolean }>()
);

export const setRotationValue = createAction(
  '[Controllers] Set Rotation Value',
  props<{ rotationValue: number }>()
);

export const setShowFullscreen = createAction(
  '[Controllers] Set Show FullScreen',
  props<{ showFullscreen: boolean }>()
);

export const setShowFullscreenTooltip = createAction(
  '[Controllers] Set Show FullScreen Tooltip',
  props<{ showFullscreenTooltip: boolean }>()
);

export const setFullscreenDictionary = createAction(
  '[Controllers] Set FullScreen Dictionary',
  props<{ fullscreenDictionary: MangolControllersFullScreenDictionary }>()
);
