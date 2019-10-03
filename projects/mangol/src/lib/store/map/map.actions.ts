import { createAction, props } from '@ngrx/store';
import { MangolMap } from '../../classes/Map';
import { MangolConfigMap } from '../../interfaces/config-map.interface';

export const setMap = createAction(
  '[Map] Set Map',
  props<{ map: MangolConfigMap }>()
);

