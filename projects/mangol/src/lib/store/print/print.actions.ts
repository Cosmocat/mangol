import { createAction, props } from '@ngrx/store';

import { PrintDictionary } from '../../interfaces/config-toolbar.interface';
import { PrintLayout, PrintSize } from './print.reducers';

export const hasPrint = createAction(
  '[Print] Has Print',
  props<{ hasPrint: boolean }>()
);

export const setDisabled = createAction(
  '[Print] Set Disabled',
  props<{ disabled: boolean }>()
);

export const setTitle = createAction(
  '[Print] Set Title',
  props<{ title: string }>()
);

export const setDictionary = createAction(
  '[Print] Set Dictionary',
  props<{ dictionary: PrintDictionary }>()
);

export const setResolutions = createAction(
  '[Print] Set Resolutions',
  props<{ resolutions: number[] }>()
);

export const setSizes = createAction(
  '[Print] Set Sizes',
  props<{ sizes: PrintSize[] }>()
);

export const setLayouts = createAction(
  '[Print] Set Layouts',
  props<{ layouts: PrintLayout[] }>()
);

export const setSelectedResolution = createAction(
  '[Print] Set Selected Resolution',
  props<{ selectedResolution: number }>()
);

export const setSelectedSize = createAction(
  '[Print] Set Selected Size',
  props<{ selectedSize: PrintSize }>()
);

export const setSelectedLayout = createAction(
  '[Print] Set Selected Layout',
  props<{ selectedLayout: PrintLayout }>()
);
