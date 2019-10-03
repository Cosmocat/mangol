import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import View from 'ol/View';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { shownStateTrigger } from '../controllers.animations';
import * as ControllersActions from './../../../store/controllers/controllers.actions';
import { MangolControllersRotationStateModel } from './../../../store/controllers/controllers.reducers';
import * as fromMangol from './../../../store/mangol.reducers';
import { MapService } from '../../map/map.service';

@Component({
  selector: 'mangol-rotation-button',
  templateUrl: './rotation-button.component.html',
  styleUrls: ['./rotation-button.component.scss'],
  animations: [shownStateTrigger]
})
export class RotationButtonComponent implements OnInit, OnDestroy {
  rotation$: Observable<MangolControllersRotationStateModel>;
  rotationFunction: any = null;
  animationDuration = 500;

  mapSubscription: Subscription;

  constructor(private store: Store<fromMangol.MangolState>, private mapService: MapService) {
    this.rotation$ = this.store.select(fromMangol.getControllersRotation);
    const view = this.mapService.map.getView();
    this.store.dispatch(ControllersActions.setRotationValue({rotationValue: view.getRotation()}) );
    if (this.rotationFunction !== null) {
      view.un('change:rotation', this.rotationFunction);
    }
    this.rotationFunction = evt => this._createRotationFunction(evt);
    view.on('change:rotation', this.rotationFunction);
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.mapSubscription) {
      this.mapSubscription.unsubscribe();
    }
    this.mapService.map.getView().un('change:rotation', this.rotationFunction);
  }

  rotateNorth() {
      const view = this.mapService.map.getView();
      if (view.getRotation() !== 0) {
        view.animate({ rotation: 0, duration: this.animationDuration });
        setTimeout(() => {
          view.setRotation(0);
        }, this.animationDuration + 1);
      }
  }

  getRotationStyle(rotation: number) {
    return { transform: `rotate(${rotation}rad)` };
  }

  private _createRotationFunction(evt) {
    const targetView = <View>evt.target;
    this.store.dispatch(ControllersActions.setRotationValue({rotationValue: targetView.getRotation()}));
  }
}
