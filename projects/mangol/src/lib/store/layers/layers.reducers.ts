import { MangolLayer } from './../../classes/Layer';
import * as LayersActions from './layers.actions';
import VectorLayer from 'ol/layer/Vector';
import { createReducer, on } from '@ngrx/store';
import { MangolVectorLayer } from '../../classes/VectorLayer';

export interface State {
  layers: MangolLayer[];
  measureLayer: MangolVectorLayer;
}

const initialState: State = {
  layers: [],
  measureLayer: null
};

export const layersReducer = createReducer(
  initialState,
  on(LayersActions.setLayers, (state, { layers }) => {
      return {
          ...state,
          layers: layers
      };
  }),
  on(LayersActions.addLayer, (state, { layer }) => {
    return {
        ...state,
        layers: [...state.layers, layer]
    };
  }),
  on(LayersActions.removeLayer, (state, { layerName }) => {
    return {
        ...state,
        layers: [...state.layers.filter(l => l.name !== layerName)]
    };
  }),
  on(LayersActions.setMeasureLayer, (state, { layer }) => {
    return {
        ...state,
        measureLayer: layer
    };
  }),
);
