import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import { Observable } from 'rxjs';

import { PrintDictionary } from './interfaces/config-toolbar.interface';
import { MangolLayer } from './classes/Layer';
import { CursorMode } from './interfaces/cursor-mode';
import {
  MangolControllersFullScreenDictionary,
  MangolControllersPositionDictionary,
  MangolControllersRotationDictionary,
  MangolControllersZoomDictionary
} from './interfaces/config-map-controllers.interface';
import { MangolConfig } from './interfaces/config.interface';
import * as ConfigActions from './store/config/config.actions';
import * as fromConfig from './store/config/config.reducers';
import * as ControllersActions from './store/controllers/controllers.actions';
import * as fromControllers from './store/controllers/controllers.reducers';
import * as MangolActions from './store/mangol.actions';
import * as fromMangol from './store/mangol.reducers';
import * as MapActions from './store/map/map.actions';
import * as fromMap from './store/map/map.reducers';
import * as SidebarActions from './store/sidebar/sidebar.actions';
import * as fromSidebar from './store/sidebar/sidebar.reducers';
import * as fromCursor from './store/cursor/cursor.reducers';
import * as CursorActions from './store/cursor/cursor.actions';
import * as LayersActions from './store/layers/layers.actions';
import * as fromLayers from './store/layers/layers.reducers';
import * as FeatureinfoActions from './store/featureinfo/featureinfo.actions';
import * as fromFeatureinfo from './store/featureinfo/featureinfo.reducers';
import { FeatureinfoDictionary } from './store/featureinfo/featureinfo.reducers';
import * as fromLayertree from './store/layertree/layertree.reducers';
import * as LayertreeActions from './store/layertree/layertree.actions';
import { LayertreeDictionary } from './store/layertree/layertree.reducers';
import * as fromMeasure from './store/measure/measure.reducers';
import * as MeasureActions from './store/measure/measure.actions';
import {
  MeasureDictionary,
  MeasureMode
} from './store/measure/measure.reducers';
import { PrintLayout, PrintSize } from './store/print/print.reducers';
import * as fromPrint from './store/print/print.reducers';
import * as PrintActions from './store/print/print.actions';
import { MangolConfigMap } from './interfaces/config-map.interface';
import { MangolMap } from './classes/Map';
import { MangolVectorLayer } from './classes/VectorLayer';

@Injectable({
  providedIn: 'root'
})
export class MangolService {
  configState$: Observable<fromConfig.State>;
  mapState$: Observable<fromMap.State>;
  sidebarState$: Observable<fromSidebar.State>;
  controllersState$: Observable<fromControllers.State>;
  cursorState$: Observable<fromCursor.State>;
  featureinfoState$: Observable<fromFeatureinfo.State>;
  layersState$: Observable<fromLayers.State>;
  layertreeState$: Observable<fromLayertree.State>;
  measureState$: Observable<fromMeasure.State>;
  printState$: Observable<fromPrint.State>;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.configState$ = this.store.select(fromMangol.getConfigState);
    this.mapState$ = this.store.select(fromMangol.getMapState);
    this.sidebarState$ = this.store.select(fromMangol.getSidebarState);
    this.controllersState$ = this.store.select(fromMangol.getControllersState);
    this.cursorState$ = this.store.select(fromMangol.getCursorState);
    this.featureinfoState$ = this.store.select(fromMangol.getFeatureInfoState);
    this.layersState$ = this.store.select(fromMangol.getLayersState);
    this.layertreeState$ = this.store.select(fromMangol.getLayertreeState);
    this.measureState$ = this.store.select(fromMangol.getMeasureState);
    this.printState$ = this.store.select(fromMangol.getPrint);
  }

  /**
   * Resets the Mangol State
   */
  resetMangolState(): void {
    this.store.dispatch(MangolActions.clearState());
  }

  /*
   * CONFIG state functions
   */

  setConfig(config: MangolConfig): void {
    this.store.dispatch(ConfigActions.setConfig({ config }));
  }

  /*
   * MAP state functions
   */

  setMap(map: MangolConfigMap): void {
    this.store.dispatch(MapActions.setMap({ map }));
  }

  /*
   * SIDEBAR state functions
   */

  toggleSidebar(): void {
    this.store.dispatch(SidebarActions.toggle());
  }
  setHasSidebar(hasSidebar: boolean): void {
    this.store.dispatch(SidebarActions.setHasSidebar({ hasSidebar }));
  }
  setSidebarMode(mode: string): void {
    this.store.dispatch(SidebarActions.setMode({ mode }));
  }
  setSidebarCollapsible(collapsible: boolean): void {
    this.store.dispatch(SidebarActions.setCollapsible({ collapsible }));
  }
  setSidebarOpened(opened: boolean): void {
    this.store.dispatch(SidebarActions.setOpened({ opened }));
  }
  setSidebarTitle(title: string): void {
    this.store.dispatch(SidebarActions.setTitle({ title }));
  }
  setSidebarSelectedModule(selectedModule: string): void {
    this.store.dispatch(SidebarActions.setSelectedModule({ selectedModule }));
  }

  /*
   * CONTROLLERS state functions
   */

  resetControllers(): void {
    this.store.dispatch(ControllersActions.reset());
  }
  setControllersShowZoom(showZoom: boolean): void {
    this.store.dispatch(ControllersActions.setShowZoom({ showZoom }));
  }
  setControllersZoomDictionary(
    zoomDictionary: MangolControllersZoomDictionary
  ): void {
    this.store.dispatch(ControllersActions.setZoomDictionary({ zoomDictionary }));
  }
  setControllersZoomShowTooltip(zoomShowTooltip: boolean): void {
    this.store.dispatch(ControllersActions.setZoomShowTooltip({ zoomShowTooltip }));
  }
  setControllersShowPosition(showPosition: boolean): void {
    this.store.dispatch(ControllersActions.setShowPosition({ showPosition }));
  }
  setControllersPositionPrecision(positionPrecision: number): void {
    this.store.dispatch(ControllersActions.setPositionPrecision({ positionPrecision }));
  }
  setControllersPositionCoordinates(positionCoordinates: [number, number]): void {
    this.store.dispatch(ControllersActions.setPositionCoordinates({ positionCoordinates }));
  }
  setControllersPositionDictionary(
    positionDictionary: MangolControllersPositionDictionary
  ): void {
    this.store.dispatch(ControllersActions.setPositionDictionary({ positionDictionary}));
  }
  setControllersShowRotation(showRotation: boolean): void {
    this.store.dispatch(ControllersActions.setShowRotation({ showRotation }));
  }
  setControllersRotationDictionary(
    rotationDictionary: MangolControllersRotationDictionary
  ): void {
    this.store.dispatch(ControllersActions.setRotationDictionary({ rotationDictionary }));
  }
  setControllersShowRotationTooltip(showRotationTooltip: boolean): void {
    this.store.dispatch(ControllersActions.setShowRotationTooltip({ showRotationTooltip }));
  }
  setControllersRotationValue(rotationValue: number): void {
    this.store.dispatch(ControllersActions.setRotationValue({ rotationValue }));
  }
  setControllersShowFullscreen(showFullscreen: boolean): void {
    this.store.dispatch(ControllersActions.setShowFullscreen({ showFullscreen }));
  }
  setControllersShowFullscreenTooltip(showFullscreenTooltip: boolean): void {
    this.store.dispatch(ControllersActions.setShowFullscreenTooltip({ showFullscreenTooltip }));
  }
  setControllersFullscreenDictionary(
    fullscreenDictionary: MangolControllersFullScreenDictionary
  ): void {
    this.store.dispatch(ControllersActions.setFullscreenDictionary({ fullscreenDictionary }));
  }

  /*
   * CURSOR state functions
   */

  resetCursorMode(): void {
    this.store.dispatch(CursorActions.resetMode());
  }
  setCursorMode(mode: CursorMode): void {
    this.store.dispatch(CursorActions.setMode({mode}));
  }
  setCursorVisible(visible: boolean): void {
    this.store.dispatch(CursorActions.setVisible({visible}));
  }
  setCursorLayer(layer: VectorLayer): void {
    this.store.dispatch(CursorActions.setLayer({layer}));
  }

  /*
   * FEATUREINFO state functions
   */

  featureinfoSetHasFeatureinfo(hasFeatureinfo: boolean): void {
    this.store.dispatch(FeatureinfoActions.hasFeatureInfo({hasFeatureinfo}));
  }
  featureinfoSetDisabled(disabled: boolean): void {
    this.store.dispatch(FeatureinfoActions.setDisabled({disabled}));
  }
  featureinfoSetTitle(title: string): void {
    this.store.dispatch(FeatureinfoActions.setTitle({title}));
  }
  featureinfoSetMaxFeatures(maxFeatures: number): void {
    this.store.dispatch(FeatureinfoActions.setMaxFeatures({maxFeatures}));
  }
  featureinfoSetLayers(layers: MangolLayer[]): void {
    this.store.dispatch(FeatureinfoActions.setLayers({layers}));
  }
  featureinfoSetSelectedLayer(selectedLayer: MangolLayer): void {
    this.store.dispatch(FeatureinfoActions.setSelectedLayer({selectedLayer}));
  }
  featureinfoSetResultsLayer(resultsLayer: VectorLayer): void {
    this.store.dispatch(FeatureinfoActions.setResultsLayer({resultsLayer}));
  }
  featureinfoSetResultsItems(resultItems: Feature[]): void {
    this.store.dispatch(FeatureinfoActions.setResultsItems({resultItems}));
  }
  featureinfoSetDictionary(dictionary: FeatureinfoDictionary): void {
    this.store.dispatch(FeatureinfoActions.setDictionary({dictionary}));
  }
  featureinfoSetHoverColor(hoverColor: [number, number, number]): void {
    this.store.dispatch(FeatureinfoActions.setHoverColor({hoverColor}));
  }

  /**
   * LAYERS state functions
   */

  layersSetLayers(layers: MangolLayer[]): void {
    this.store.dispatch(LayersActions.setLayers({ layers }));
  }

  layersAddLayer(layer: MangolLayer): void {
    this.store.dispatch(LayersActions.addLayer({ layer }));
  }

  layersRemoveLayer(layerName: string): void {
    this.store.dispatch(LayersActions.removeLayer({ layerName }));
  }

  layersSetMeasureLayer(layer: MangolVectorLayer): void {
    this.store.dispatch(LayersActions.setMeasureLayer({ layer }));
  }

  /**
   * LAYERTREE state functions
   */

  layertreeSetHasLayertree(hasLayertree: boolean): void {
    this.store.dispatch(LayertreeActions.hasLayertree({hasLayertree}));
  }
  layertreeSetDisabled(disabled: boolean): void {
    this.store.dispatch(LayertreeActions.setDisabled({disabled}));
  }
  layertreeSetTitle(title: string): void {
    this.store.dispatch(LayertreeActions.setTitle({title}));
  }
  layertreeSetDictionary(dictionary: LayertreeDictionary): void {
    this.store.dispatch(LayertreeActions.setDictionary({dictionary}));
  }
  layertreeShowLayergroupBadges(showBadges: boolean): void {
    this.store.dispatch(LayertreeActions.showLayergroupBadges({showBadges}));
  }

  /**
   * MEASURE state functions
   */

  measureSetHasMeasure(hasMeasure: boolean): void {
    this.store.dispatch(MeasureActions.hasMeasure({hasMeasure}));
  }
  measureSetDisabled(disabled: boolean): void {
    this.store.dispatch(MeasureActions.setDisabled({disabled}));
  }
  measureSetTitle(title: string): void {
    this.store.dispatch(MeasureActions.setTitle({title}));
  }
  measureSetDictionary(dictionary: MeasureDictionary): void {
    this.store.dispatch(MeasureActions.setDictionary({dictionary}));
  }
  measureSetMode(mode: MeasureMode): void {
    this.store.dispatch(MeasureActions.setMode({mode}));
  }

  /**
   * PRINT state functions
   */
  printSetHasPrint(hasPrint: boolean): void {
    this.store.dispatch(PrintActions.hasPrint({hasPrint}));
  }
  printSetDisabled(disabled: boolean): void {
    this.store.dispatch(PrintActions.setDisabled({disabled}));
  }
  printSetTitle(title: string): void {
    this.store.dispatch(PrintActions.setTitle({title}));
  }
  printSetResolutions(resolutions: number[]): void {
    this.store.dispatch(PrintActions.setResolutions({resolutions}));
  }
  printSetLayouts(layouts: PrintLayout[]): void {
    this.store.dispatch(PrintActions.setLayouts({layouts}));
  }
  printSetSizes(sizes: PrintSize[]): void {
    this.store.dispatch(PrintActions.setSizes({sizes}));
  }
  printSetDictionary(dictionary: PrintDictionary): void {
    this.store.dispatch(PrintActions.setDictionary({dictionary}));
  }
  printSetSelectedLayout(selectedLayout: PrintLayout): void {
    this.store.dispatch(PrintActions.setSelectedLayout({selectedLayout}));
  }
  printSetSelectedResolution(selectedResolution: number): void {
    this.store.dispatch(PrintActions.setSelectedResolution({selectedResolution}));
  }
  printSetSelectedSize(selectedSize: PrintSize): void {
    this.store.dispatch(PrintActions.setSelectedSize({selectedSize}));
  }
}
