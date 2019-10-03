import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import * as LayerActions from '../../store/layers/layers.actions';
import * as fromMangol from '../../store/mangol.reducers';
import * as MeasureActions from '../../store/measure/measure.actions';
import {
  MeasureDictionary,
  MeasureMode
} from '../../store/measure/measure.reducers';
import { MangolConfigMeasureItem } from './../../interfaces/config-toolbar.interface';
import * as CursorActions from './../../store/cursor/cursor.actions';
import { MeasureService } from './measure.service';
import { MapService } from '../map/map.service';
import { MangolVectorLayer } from '../../classes/VectorLayer';

@Component({
  selector: 'mangol-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent implements OnInit, OnDestroy {
  dictionary$: Observable<MeasureDictionary>;
  measureConfig$: Observable<MangolConfigMeasureItem>;
  map: Map;
  measureLayer$: Observable<VectorLayer>;
  measureMode$: Observable<MeasureMode>;

  measureConfigSubscription: Subscription;

  constructor(
    private store: Store<fromMangol.MangolState>,
    private measureService: MeasureService,
    private mapService: MapService
  ) {
    this.dictionary$ = this.store.select(fromMangol.getMeasureDictionary);
    this.measureConfig$ = this.store.select(fromMangol.getMeasureConfig);
    this.map = this.mapService.map;
    this.measureLayer$ = this.store
      .select(fromMangol.getMeasureLayer)
      .pipe(filter(measureLayer => measureLayer !== null));
    this.measureMode$ = this.store.select(fromMangol.getMeasureMode);

    this.measureConfigSubscription = this.measureConfig$.subscribe(config => {
      if (config.hasOwnProperty('dictionary')) {
        this.store.dispatch(MeasureActions.setDictionary({dictionary: config.dictionary}));
      }
    });
  }

  ngOnInit() {
      const layer = new MangolVectorLayer({
        source: new VectorSource(),
        style: (feature: Feature) => this.measureService.getStyle(feature)
      });
      this.map.addLayer(layer);
      this.store.dispatch(LayerActions.setMeasureLayer({ layer }));
  }

  ngOnDestroy() {
    this._cleanUp();
    if (this.measureConfigSubscription) {
      this.measureConfigSubscription.unsubscribe();
    }
  }

  private _cleanUp() {
    this.store
      .select(fromMangol.getMeasureLayer)
      .pipe(take(1))
      .subscribe(measureLayer => {
        this.store.dispatch(LayerActions.setMeasureLayer(null));
        this.map.removeLayer(measureLayer);
        this.store.dispatch(CursorActions.resetMode());
      });
  }
}
