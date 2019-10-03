import {
  MangolControllersPositionOptions,
  MangolControllersRotationOptions,
  MangolControllersScalebarOptions,
  MangolControllersZoomOptions,
  MangolControllersFullScreenOptions
} from './../../interfaces/config-map-controllers.interface';
import * as ControllersActions from './controllers.actions';
import { createReducer, on } from '@ngrx/store';

export interface MangolControllersPositionStateModel
  extends MangolControllersPositionOptions {
  coordinates: number[];
}

export interface MangolControllersRotationStateModel
  extends MangolControllersRotationOptions {
  rotation: number;
}

export interface ControllersStateModel {
  zoom: MangolControllersZoomOptions;
  scalebar: MangolControllersScalebarOptions;
  position: MangolControllersPositionStateModel;
  rotation: MangolControllersRotationStateModel;
}

export interface State {
  zoom: MangolControllersZoomOptions;
  scalebar: MangolControllersScalebarOptions;
  position: MangolControllersPositionStateModel;
  rotation: MangolControllersRotationStateModel;
  fullScreen: MangolControllersFullScreenOptions;
}

const initialState: State = {
  zoom: {
    show: false,
    dictionary: {
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out'
    },
    showTooltip: true
  },
  scalebar: { show: false },
  position: {
    show: false,
    coordinates: [],
    precision: 2,
    dictionary: {
      textCopied: 'Copied',
      copyCoordinates: 'Copy coordinates',
      closeSnackbar: 'Close'
    }
  },
  rotation: {
    show: false,
    dictionary: { rotateToNorth: 'Rotate to North' },
    showTooltip: true,
    rotation: 0
  },
  fullScreen: {
    show: false,
    showTooltip: true,
    dictionary: {
      maximize: 'Maximize',
      minimize: 'Minimize'
    }
  }
};


export const controllersReducer = createReducer(
  initialState,
  on(ControllersActions.reset, (state) => {
      return {
        ...state,
        zoom: initialState.zoom,
        scalebar: initialState.scalebar,
        position: initialState.position,
        rotation: initialState.rotation,
        fullScreen: initialState.fullScreen
      };
  }),
  on(ControllersActions.setShowZoom, (state, { showZoom }) => {
    return { ...state, zoom: { ...state.zoom, show: showZoom } };
  }),
  on(ControllersActions.setZoomDictionary, (state, { zoomDictionary }) => {
    return { ...state, zoom: { ...state.zoom, dictionary: zoomDictionary } };
  }),
  on(ControllersActions.setZoomShowTooltip, (state, { zoomShowTooltip }) => {
    return { ...state, zoom: { ...state.zoom, showTooltip: zoomShowTooltip } };
  }),
  on(ControllersActions.setScalebar, (state, { scalebar }) => {
    return { ...state, scalebar: scalebar };
  }),
  on(ControllersActions.setShowPosition, (state, { showPosition }) => {
    return { ...state, position: { ...state.position, show: showPosition }};
  }),
  on(ControllersActions.setPositionPrecision, (state, { positionPrecision }) => {
    return {...state, position: { ...state.position, precision: positionPrecision }};
  }),
  on(ControllersActions.setPositionCoordinates, (state, { positionCoordinates }) => {
    return {...state, position: { ...state.position, coordinates: positionCoordinates }};
  }),
  on(ControllersActions.setPositionDictionary, (state, { positionDictionary }) => {
    return {...state, position: { ...state.position, dictionary: positionDictionary }};
  }),
  on(ControllersActions.setShowRotation, (state, { showRotation }) => {
    return { ...state, rotation: { ...state.rotation, show: showRotation }};
  }),
  on(ControllersActions.setRotationValue, (state, { rotationValue }) => {
    return {...state, rotation: { ...state.rotation, rotation: rotationValue }};
  }),
  on(ControllersActions.setShowRotationTooltip, (state, { showRotationTooltip }) => {
    return {...state, rotation: { ...state.rotation, showTooltip: showRotationTooltip }};
  }),
  on(ControllersActions.setRotationDictionary, (state, { rotationDictionary }) => {
    return {...state, rotation: { ...state.rotation, dictionary: rotationDictionary }};
  }),
  on(ControllersActions.setShowFullscreen, (state, { showFullscreen }) => {
    return {...state, fullScreen: { ...state.fullScreen, show: showFullscreen }};
  }),
  on(ControllersActions.setShowFullscreenTooltip, (state, { showFullscreenTooltip }) => {
    return {...state, fullScreen: { ...state.fullScreen, showTooltip: showFullscreenTooltip }};
  }),
  on(ControllersActions.setFullscreenDictionary, (state, { fullscreenDictionary }) => {
    return {...state, fullScreen: { ...state.fullScreen, dictionary: fullscreenDictionary }};
  }),
);
