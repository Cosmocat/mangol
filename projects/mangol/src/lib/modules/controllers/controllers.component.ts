import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import {
  MangolControllersZoomOptions,
  MangolControllersFullScreenOptions
} from '../../interfaces/config-map-controllers.interface';
import { MangolConfig } from './../../interfaces/config.interface';
import * as ControllersActions from './../../store/controllers/controllers.actions';
import {
  MangolControllersPositionStateModel,
  MangolControllersRotationStateModel
} from './../../store/controllers/controllers.reducers';
import * as fromMangol from './../../store/mangol.reducers';

@Component({
  selector: 'mangol-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent implements OnInit, OnDestroy {
  config$: Observable<MangolConfig>;
  hasSidebar$: Observable<boolean>;
  sidebarCollapsible$: Observable<boolean>;
  zoom$: Observable<MangolControllersZoomOptions>;
  position$: Observable<MangolControllersPositionStateModel>;
  rotation$: Observable<MangolControllersRotationStateModel>;
  fullScreen$: Observable<MangolControllersFullScreenOptions>;

  configSubscription: Subscription;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.config$ = this.store.select(fromMangol.getConfig);
    this.hasSidebar$ = this.store.select(fromMangol.getHasSidebar);
    this.sidebarCollapsible$ = this.store.select(
      fromMangol.getSidebarCollapsible
    );
    this.zoom$ = this.store.select(fromMangol.getControllersZoom);
    this.position$ = this.store.select(fromMangol.getControllersPosition);
    this.rotation$ = this.store.select(fromMangol.getControllersRotation);
    this.fullScreen$ = this.store.select(fromMangol.getControllersFullScreen);
  }

  ngOnInit() {
    this.configSubscription = this.config$.subscribe(config => {
      this.store.dispatch(ControllersActions.reset());
      if (
        typeof config !== 'undefined' &&
        config !== null &&
        !!config.map &&
        !!config.map.controllers
      ) {
        /**
         * Zoom buttons config
         */
        if (!!config.map.controllers.zoom) {
          const zoomOptions = config.map.controllers.zoom;
          if (!!zoomOptions.show) {
            this.store.dispatch(ControllersActions.setShowZoom({ showZoom: zoomOptions.show }));
          }
          if (!!zoomOptions.dictionary) {
            this.store.dispatch(ControllersActions.setZoomDictionary({ zoomDictionary: zoomOptions.dictionary }));
          }
          if (!!zoomOptions.showTooltip) {
            this.store.dispatch(ControllersActions.setZoomShowTooltip({ zoomShowTooltip: zoomOptions.showTooltip }));
          }
        }
        /**
         * Scalebar config (not yet implemented)
         */
        if (!!config.map.controllers.scalebar) {
          this.store.dispatch(ControllersActions.setScalebar({ scalebar: config.map.controllers.scalebar }));
        }
        /**
         * Mouse position config
         */
        if (!!config.map.controllers.position) {
          const positionOptions = config.map.controllers.position;
          if (!!positionOptions.show) {
            this.store.dispatch(ControllersActions.setShowPosition({ showPosition: positionOptions.show }));
          }
          if (!!positionOptions.precision) {
            this.store.dispatch(ControllersActions.setPositionPrecision({ positionPrecision: positionOptions.precision })
            );
          }
          if (!!positionOptions.dictionary) {
            this.store.dispatch(ControllersActions.setPositionDictionary({positionDictionary: positionOptions.dictionary})
            );
          }
        }
        /**
         * Rotation button config
         */
        if (!!config.map.controllers.rotation) {
          const rotationOptions = config.map.controllers.rotation;
          if (!!rotationOptions.show) {
            this.store.dispatch(ControllersActions.setShowRotation({ showRotation: rotationOptions.show }));
          }
          if (!!rotationOptions.dictionary) {
            this.store.dispatch(ControllersActions.setRotationDictionary({rotationDictionary: rotationOptions.dictionary}));
          }
          if (!!rotationOptions.showTooltip) {
            this.store.dispatch(ControllersActions.setShowRotationTooltip({showRotationTooltip: rotationOptions.showTooltip}));
          }
        }
        /**
         * Fullscreen button config
         */
        if (!!config.map.controllers.fullScreen) {
          const fullscreenOptions = config.map.controllers.fullScreen;
          if (fullscreenOptions.hasOwnProperty('show')) {
            this.store.dispatch(ControllersActions.setShowFullscreen({showFullscreen: fullscreenOptions.show}));
          }
          if (fullscreenOptions.hasOwnProperty('dictionary')) {
            this.store.dispatch(ControllersActions.setFullscreenDictionary({fullscreenDictionary: fullscreenOptions.dictionary}));
          }
          if (fullscreenOptions.hasOwnProperty('showTooltip')) {
            this.store.dispatch(ControllersActions.setShowFullscreenTooltip({showFullscreenTooltip: fullscreenOptions.showTooltip}));
          }
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }
}
