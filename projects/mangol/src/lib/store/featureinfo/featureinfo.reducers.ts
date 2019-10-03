import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';

import { MangolLayer } from './../../classes/Layer';
import * as FeatureinfoActions from './featureinfo.actions';
import { createReducer, on } from '@ngrx/store';

export interface FeatureinfoDictionary {
  clearSelection?: string;
  chooseLayer?: string;
  clickOnMap?: string;
  noLayers?: string;
  numberOfFeaturesFound?: string;
  closeSnackbar?: string;
  zoomToFeature?: string;
  showAllResults?: string;
  feature?: string;
  exportToCsv?: string;
}

export interface State {
  hasFeatureinfo: boolean;
  disabled: boolean;
  title: string;
  maxFeatures: number;
  layers: MangolLayer[];
  selectedLayer: MangolLayer;
  resultsLayer: VectorLayer;
  resultsItems: Feature[];
  snackbarDuration: number;
  hoverColor: [number, number, number];
  dictionary: FeatureinfoDictionary;
}

const initialState: State = {
  hasFeatureinfo: false,
  disabled: false,
  title: 'Select on Map',
  maxFeatures: 10,
  layers: [],
  selectedLayer: null,
  resultsLayer: null,
  resultsItems: [],
  snackbarDuration: 3000,
  hoverColor: [255, 255, 0],
  dictionary: {
    clearSelection: 'Clear selection',
    chooseLayer: 'Choose a layer...',
    clickOnMap: 'Click on Map',
    noLayers: 'There are currently no queryable layers configured.',
    numberOfFeaturesFound: 'Number of features found',
    closeSnackbar: 'Close',
    zoomToFeature: 'Zoom to Feature',
    showAllResults: 'Open results dialog',
    feature: 'Feature',
    exportToCsv: 'Export to CSV'
  }
};

export const featureinfoReducer = createReducer(
  initialState,
  on(FeatureinfoActions.hasFeatureInfo, (state, { hasFeatureinfo }) => {
      return { ...state, hasFeatureinfo: hasFeatureinfo };
  }),
  on(FeatureinfoActions.setDisabled, (state, { disabled }) => {
    return { ...state, disabled: disabled };
  }),
  on(FeatureinfoActions.setTitle, (state, { title }) => {
    return { ...state, title: title };
  }),
  on(FeatureinfoActions.setMaxFeatures, (state, { maxFeatures }) => {
    return { ...state, maxFeatures: maxFeatures };
  }),
  on(FeatureinfoActions.setLayers, (state, { layers }) => {
    return { ...state, layers: layers };
  }),
  on(FeatureinfoActions.setSelectedLayer, (state, { selectedLayer }) => {
    return { ...state, selectedLayer: selectedLayer };
  }),
  on(FeatureinfoActions.setResultsLayer, (state, { resultsLayer }) => {
    return { ...state, resultsLayer: resultsLayer };
  }),
  on(FeatureinfoActions.setResultsItems, (state, { resultItems }) => {
    return { ...state, resultsItems: resultItems };
  }),
  on(FeatureinfoActions.setDictionary, (state, { dictionary }) => {
    const dict = { ...state.dictionary };
      for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
          dict[key] = dictionary[key];
        }
      }
      return { ...state, dictionary: dict };
  }),
  on(FeatureinfoActions.setHoverColor, (state, { hoverColor }) => {
    return { ...state, hoverColor: hoverColor };
  })
);

