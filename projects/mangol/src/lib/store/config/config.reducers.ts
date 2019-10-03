import { MangolConfig } from '../../interfaces/config.interface';
import * as ConfigActions from './config.actions';
import { on, createReducer } from '@ngrx/store';

export interface State {
  config: MangolConfig;
}

const initialState: State = {
  config: null
};

export const configReducer = createReducer(
  initialState,
  on(ConfigActions.setConfig, (state, { config }) => {
      return {
          ...state,
          config: config
      };
  }),
);
