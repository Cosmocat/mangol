import * as LayertreeActions from './layertree.actions';
import { createReducer, on } from '@ngrx/store';

export interface LayertreeDictionary {
  groups?: string;
  layers?: string;
  expandAll?: string;
  collapseAll?: string;
  turnLayersOn?: string;
  turnLayersOff?: string;
  showLayerTransparency?: string;
  showLayerDescription?: string;
}

export interface State {
  hasLayertree: boolean;
  disabled: boolean;
  title: string;
  showLayergroupBadges: boolean;
  dictionary: LayertreeDictionary;
}

const initialState: State = {
  hasLayertree: false,
  disabled: false,
  title: 'Layertree',
  showLayergroupBadges: true,
  dictionary: {
    groups: 'Groups',
    layers: 'Layers',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    turnLayersOn: 'Turn layers on',
    turnLayersOff: 'Turn layers off',
    showLayerTransparency: 'Transparency',
    showLayerDescription: 'Layer description'
  }
};

export const layertreeReducer = createReducer(
  initialState,
  on(LayertreeActions.hasLayertree, (state, { hasLayertree }) => {
    return { ...state, hasLayertree: hasLayertree };
  }),
  on(LayertreeActions.setDisabled, (state, { disabled }) => {
    return { ...state, disabled: disabled };
  }),
  on(LayertreeActions.setTitle, (state, { title }) => {
    return { ...state, title: title };
  }),
  on(LayertreeActions.setDictionary, (state, { dictionary }) => {
    const dict = { ...state.dictionary };
      for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
          dict[key] = dictionary[key];
        }
      }
      return { ...state, dictionary: dict };
  }),
  on(LayertreeActions.showLayergroupBadges, (state, { showBadges }) => {
    return { ...state, showLayergroupBadges: showBadges };
  }),
);

