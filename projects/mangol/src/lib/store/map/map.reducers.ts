import Map from 'ol/Map';

import * as MapActions from './map.actions';
import { createReducer, on } from '@ngrx/store';
import { MangolConfigMap } from '../../interfaces/config-map.interface';

export interface State {
  map: MangolConfigMap;
}

const initialState: State = {
  map: null
};

export const mapReducer = createReducer(
  initialState,
  on(MapActions.setMap, (state, { map }) => {
      return {
          ...state,
          map: map
      };
  }),
);
