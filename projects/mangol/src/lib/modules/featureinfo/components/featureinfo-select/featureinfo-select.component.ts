import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MangolLayer } from '../../../../classes/Layer';
import { FeatureinfoDictionary } from '../../../../store/featureinfo/featureinfo.reducers';
import * as FeatureinfoActions from './../../../../store/featureinfo/featureinfo.actions';
import * as fromMangol from './../../../../store/mangol.reducers';

@Component({
  selector: 'mangol-featureinfo-select',
  templateUrl: './featureinfo-select.component.html',
  styleUrls: ['./featureinfo-select.component.scss']
})
export class FeatureinfoSelectComponent implements OnInit {
  @Input()
  layers: MangolLayer[];
  @Input()
  dictionary: FeatureinfoDictionary;

  selectedLayer$: Observable<MangolLayer>;

  constructor(private store: Store<fromMangol.MangolState>) {
    this.selectedLayer$ = this.store.select(fromMangol.getFeatureSelectedLayer);
  }

  ngOnInit() {
    this.store.dispatch(FeatureinfoActions.setSelectedLayer(null));
  }

  onSelectionChanged(evt: MatSelectChange) {
    if (typeof evt.value === 'undefined') {
      this.store.dispatch(FeatureinfoActions.setSelectedLayer(null));
    } else {
      const selectedLayer: MangolLayer = evt.value;
      this.store.dispatch(FeatureinfoActions.setSelectedLayer({selectedLayer}));
    }
  }
}
