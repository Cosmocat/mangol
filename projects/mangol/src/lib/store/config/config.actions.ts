import { createAction, props } from '@ngrx/store';
import { MangolConfig } from '../../interfaces/config.interface';


export const setConfig = createAction(
  '[Config] Set Config',
  props<{ config: MangolConfig }>()
);

