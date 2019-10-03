import { createAction, props } from '@ngrx/store';

export const toggle = createAction(
  '[Sidebar] Toggle'
);

export const setHasSidebar = createAction(
  '[Sidebar] Set Has Sidebar',
  props<{ hasSidebar: boolean }>()
);

export const setMode = createAction(
  '[Sidebar] Set Mode',
  props<{ mode: string }>()
);

export const setCollapsible = createAction(
  '[Sidebar] Set Collapsible',
  props<{ collapsible: boolean }>()
);

export const setOpened = createAction(
  '[Sidebar] Set Opened',
  props<{ opened: boolean }>()
);

export const setTitle = createAction(
  '[Sidebar] Set Title',
  props<{ title: string }>()
);

export const setSelectedModule = createAction(
  '[Sidebar] Set Selected Module',
  props<{ selectedModule: string }>()
);
