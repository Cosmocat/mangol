import { createAction, props } from '@ngrx/store';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';

import { MangolLayer } from './../../classes/Layer';
import { FeatureinfoDictionary } from './featureinfo.reducers';

export const hasFeatureInfo = createAction(
  '[Featureinfo] Has Featureinfo',
  props<{ hasFeatureinfo: boolean }>()
);

export const setDisabled = createAction(
  '[Featureinfo] Set Disabled',
  props<{ disabled: boolean }>()
);

export const setTitle = createAction(
  '[Featureinfo] Set Title',
  props<{ title: string }>()
);

export const setMaxFeatures = createAction(
  '[Featureinfo] Set Max Features',
  props<{ maxFeatures: number }>()
);

export const setLayers = createAction(
  '[Featureinfo] Set Layers',
  props<{ layers: MangolLayer[] }>()
);

export const setSelectedLayer = createAction(
  '[Featureinfo] Set Selected Layer',
  props<{ selectedLayer: MangolLayer }>()
);

export const setResultsLayer = createAction(
  '[Featureinfo] Set Results Layer',
  props<{ resultsLayer: VectorLayer }>()
);

export const setResultsItems = createAction(
  '[Featureinfo] Set Results Items',
  props<{ resultItems: Feature[] }>()
);

export const setDictionary = createAction(
  '[Featureinfo] Set Dictionary',
  props<{ dictionary: FeatureinfoDictionary }>()
);

export const setHoverColor = createAction(
  '[Featureinfo] Set Hover Color',
  props<{ hoverColor: [number, number, number] }>()
);
