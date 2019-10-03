import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromMangol from './../../../store/mangol.reducers';
import Map from 'ol/Map';
import { Observable } from 'rxjs';

import { shownStateTrigger } from '../controllers.animations';
import { MangolControllersZoomOptions } from './../../../interfaces/config-map-controllers.interface';
import { MapService } from '../../map/map.service';

@Component({
  selector: 'mangol-zoom-buttons',
  templateUrl: './zoom-buttons.component.html',
  styleUrls: ['./zoom-buttons.component.scss'],
  animations: [shownStateTrigger]
})
export class ZoomButtonsComponent implements OnInit {
  animationDuration = 500;
  zoom$: Observable<MangolControllersZoomOptions>;

  constructor(private store: Store<fromMangol.MangolState>, private mapService: MapService) {
    this.zoom$ = this.store.select(fromMangol.getControllersZoom);
  }

  ngOnInit() {}

  zoomIn() {
    this.mapService.map.getView().animate({
      zoom: this.mapService.map.getView().getZoom() + 1,
      duration: this.animationDuration
    });
  }

  zoomOut() {
    this.mapService.map.getView().animate({
      zoom: this.mapService.map.getView().getZoom() - 1,
      duration: this.animationDuration
    });
  }
}
