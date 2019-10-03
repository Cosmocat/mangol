import { PrintDictionary } from './../../interfaces/config-toolbar.interface';
import * as PrintActions from './print.actions';
import { createReducer, on } from '@ngrx/store';

export interface PrintLayout {
  type: 'landscape' | 'portrait';
}

export interface PrintSize {
  id: string;
  width: number;
  height: number;
}

export interface State {
  hasPrint: boolean;
  disabled: boolean;
  title: string;
  layouts: PrintLayout[];
  resolutions: number[];
  sizes: PrintSize[];
  selectedLayout: PrintLayout;
  selectedResolution: number;
  selectedSize: PrintSize;
  dictionary: PrintDictionary;
}

const initialState: State = {
  hasPrint: false,
  disabled: false,
  title: 'Print',
  resolutions: [72, 100, 150, 300],
  sizes: [
    { id: 'A5', width: 210, height: 148 },
    { id: 'A4', width: 297, height: 210 },
    { id: 'A3', width: 420, height: 297 },
    { id: 'A2', width: 594, height: 420 },
    { id: 'A1', width: 841, height: 594 },
    { id: 'A0', width: 1189, height: 841 }
  ],
  layouts: [
    {
      type: 'landscape'
    },
    {
      type: 'portrait'
    }
  ],
  selectedLayout: null,
  selectedResolution: null,
  selectedSize: null,
  dictionary: {
    print: 'Print',
    layout: 'Layout',
    size: 'Size',
    resolution: 'Resolution',
    landscape: 'Landscape',
    portrait: 'Portrait',
    clearSelection: 'Clear'
  }
};

export const printReducer = createReducer(
  initialState,
  on(PrintActions.hasPrint, (state, { hasPrint }) => {
    return { ...state, hasPrint: hasPrint };
  }),
  on(PrintActions.setDisabled, (state, { disabled }) => {
    return { ...state, disabled: disabled };
  }),
  on(PrintActions.setTitle, (state, { title }) => {
    return { ...state, title: title };
  }),
  on(PrintActions.setDictionary, (state, { dictionary }) => {
    const dict = { ...state.dictionary };
      for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
          dict[key] = dictionary[key];
        }
      }
      return { ...state, dictionary: dict };
  }),
  on(PrintActions.setLayouts, (state, { layouts }) => {
    return { ...state, layouts: layouts };
  }),
  on(PrintActions.setResolutions, (state, { resolutions }) => {
    return { ...state, resolutions: resolutions };
  }),
  on(PrintActions.setSizes, (state, { sizes }) => {
    return { ...state, sizes: sizes };
  }),
  on(PrintActions.setSelectedLayout, (state, { selectedLayout }) => {
    return { ...state, selectedLayout: selectedLayout };
  }),
  on(PrintActions.setSelectedResolution, (state, { selectedResolution }) => {
    return { ...state, selectedResolution: selectedResolution };
  }),
  on(PrintActions.setSelectedSize, (state, { selectedSize }) => {
    return { ...state, selectedSize: selectedSize };
  }),
);
