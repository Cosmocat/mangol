import { createAction } from '@ngrx/store';

// export const CLEAR_STATE = '[Mangol] Clear State';

// export class ClearState implements Action {
//   readonly type = CLEAR_STATE;
//   constructor() {}
// }

export const clearState = createAction(
  '[Mangol] Clear State'
);
