import { MeasureDictionary, MeasureMode } from './measure.reducers';
import { createAction, props } from '@ngrx/store';

export const hasMeasure = createAction(
  '[Measure] Has Measure',
  props<{ hasMeasure: boolean }>()
);

export const setDisabled = createAction(
  '[Measure] Set Disabled',
  props<{ disabled: boolean }>()
);

export const setTitle = createAction(
  '[Measure] Set Title',
  props<{ title: string }>()
);

export const setDictionary = createAction(
  '[Measure] Set Dictionary',
  props<{ dictionary: MeasureDictionary }>()
);

export const setMode = createAction(
  '[Measure] Set Mode',
  props<{ mode: MeasureMode }>()
);
