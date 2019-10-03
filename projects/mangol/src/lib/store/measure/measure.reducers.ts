import GeometryType from 'ol/geom/GeometryType';

import * as MeasureActions from './measure.actions';
import { createReducer, on } from '@ngrx/store';
import { hasFeatureInfo } from '../featureinfo/featureinfo.actions';

export interface MeasureMode {
  type: string;
  fontIcon: string;
  fontSet: string;
  geometryName: GeometryType;
}

export interface MeasureDictionary {
  clearSelection?: string;
  chooseMode?: string;
  clickOnMap?: string;
  closeSnackbar?: string;
  line?: string;
  area?: string;
  radius?: string;
  distance?: string;
  angle?: string;
  drawStartText?: string;
  drawStartTextRadius?: string;
}
export interface State {
  hasMeasure: boolean;
  disabled: boolean;
  title: string;
  modes: MeasureMode[];
  mode: MeasureMode;
  dictionary: MeasureDictionary;
}

const initialState: State = {
  hasMeasure: false,
  disabled: false,
  title: 'Measure',
  modes: [
    {
      type: 'line',
      fontSet: 'ms',
      fontIcon: 'ms-measure-distance',
      geometryName: GeometryType.LINE_STRING
    },
    {
      type: 'area',
      fontSet: 'ms',
      fontIcon: 'ms-measure-area',
      geometryName: GeometryType.POLYGON
    },
    {
      type: 'radius',
      fontSet: 'ms',
      fontIcon: 'ms-geolocation',
      geometryName: GeometryType.CIRCLE
    }
  ],
  mode: null,
  dictionary: {
    clearSelection: 'Clear selection',
    chooseMode: 'Choose measure mode...',
    clickOnMap: 'Click on Map to start measurement',
    closeSnackbar: 'Close',
    line: 'Line',
    area: 'Area',
    radius: 'Radius',
    distance: 'Distance',
    angle: 'angle',
    drawStartText:
      'Insert new vertex with single click,\nfinish measurement with double click',
    drawStartTextRadius: 'Finish measurement with single click'
  }
};


export const measureReducer = createReducer(
  initialState,
  on(MeasureActions.hasMeasure, (state, { hasMeasure }) => {
    return { ...state, hasMeasure: hasMeasure };
  }),
  on(MeasureActions.setDisabled, (state, { disabled }) => {
    return { ...state, disabled: disabled };
  }),
  on(MeasureActions.setTitle, (state, { title }) => {
    return { ...state, title: title };
  }),
  on(MeasureActions.setDictionary, (state, { dictionary }) => {
    const dict = { ...state.dictionary };
      for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
          dict[key] = dictionary[key];
        }
      }
      return { ...state, dictionary: dict };
  }),
  on(MeasureActions.setMode, (state, { mode }) => {
    return { ...state, mode: mode };
  }),
);
