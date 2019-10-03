import VectorLayer from 'ol/layer/Vector';

import { CursorMode } from './../../interfaces/cursor-mode';
import * as CursorActions from './cursor.actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
  mode: CursorMode;
  visible: boolean;
  layer: VectorLayer;
}

const initialState: State = {
  mode: { text: null, cursor: 'default' },
  visible: false,
  layer: null
};

export const cursorReducer = createReducer(
  initialState,
  on(CursorActions.resetMode, (state) => {
    const layer = state.layer;
    if (layer !== null) {
      layer.getSource().refresh();
    }
    return { ...state, mode: initialState.mode };
  }),
  on(CursorActions.setMode, (state, { mode }) => {
    const cursorLayer = state.layer;
    if (cursorLayer !== null) {
      cursorLayer.getSource().refresh();
    }
    return { ...state, mode: mode };
  }),
  on(CursorActions.setVisible, (state, { visible }) => {
    return { ...state, visible: visible };
  }),
  on(CursorActions.setLayer, (state, { layer }) => {
    return { ...state, layer: layer };
  })
);
