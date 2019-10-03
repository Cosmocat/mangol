import { createAction, props } from '@ngrx/store';
import { MangolLayer } from './../../classes/Layer';
import VectorLayer from 'ol/layer/Vector';
import { MangolVectorLayer } from '../../classes/VectorLayer';

export const setLayers = createAction(
  '[Layers] Set Layers',
  props<{ layers: MangolLayer[] }>()
);

export const addLayer = createAction(
  '[Layers] Add Layer',
  props<{ layer: MangolLayer }>()
);

export const removeLayer = createAction(
  '[Layers] Remove Layer',
  props<{ layerName: string }>()
);

export const setMeasureLayer = createAction(
  '[Layers] Set Measure Layer',
  props<{ layer: MangolVectorLayer }>()
);
