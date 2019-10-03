import { createAction, props } from '@ngrx/store';
import VectorLayer from 'ol/layer/Vector';

import { CursorMode } from './../../interfaces/cursor-mode';

export const resetMode = createAction(
  '[Cursor] Reset Mode'
);

export const setMode = createAction(
  '[Cursor] Set Mode',
  props<{ mode: CursorMode }>()
);

export const setVisible = createAction(
  '[Cursor] Set Visible',
  props<{ visible: boolean }>()
);

export const setLayer = createAction(
  '[Cursor] Set Layer',
  props<{ layer: VectorLayer }>()
);
