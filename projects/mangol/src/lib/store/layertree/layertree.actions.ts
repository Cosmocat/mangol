import { createAction, props } from '@ngrx/store';

import { LayertreeDictionary } from './layertree.reducers';

export const hasLayertree = createAction(
  '[Layertree] Has Layertree',
  props<{ hasLayertree: boolean }>()
);

export const setDisabled = createAction(
  '[Layertree] Set Disabled',
  props<{ disabled: boolean }>()
);

export const setTitle = createAction(
  '[Layertree] Set Title',
  props<{ title: string }>()
);

export const setDictionary = createAction(
  '[Layertree] Set Dictionary',
  props<{ dictionary: LayertreeDictionary }>()
);

export const showLayergroupBadges = createAction(
  '[Layertree] Show Layergroup Badges',
  props<{ showBadges: boolean }>()
);
