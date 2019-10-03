import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { PrintLayout, PrintSize } from '../../store/print/print.reducers';
import {
  MangolConfigPrintItem,
  PrintDictionary
} from './../../interfaces/config-toolbar.interface';
import * as fromMangol from './../../store/mangol.reducers';
import * as PrintActions from './../../store/print/print.actions';
import { MapService } from '../map/map.service';

declare var jsPDF: any;
export interface Layout {
  name: string;
  value: string;
}

@Component({
  selector: 'mangol-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit, OnDestroy {
  form: FormGroup;

  printConfig$: Observable<MangolConfigPrintItem>;
  dictionary$: Observable<PrintDictionary>;
  layouts$: Observable<PrintLayout[]>;
  resolutions$: Observable<number[]>;
  sizes$: Observable<PrintSize[]>;
  selectedLayout$: Observable<PrintLayout>;
  selectedResolution$: Observable<number>;
  selectedSize$: Observable<PrintSize>;

  printConfigSubscription: Subscription;

  printInProgress = false;

  constructor(
    private store: Store<fromMangol.MangolState>,
    private fb: FormBuilder,
    private mapService: MapService
  ) {
    this.printConfig$ = this.store.select(fromMangol.getPrintConfig);
    this.dictionary$ = this.store.select(fromMangol.getPrintDictionary);
    this.layouts$ = this.store.select(fromMangol.getPrintLayouts);
    this.resolutions$ = this.store.select(fromMangol.getPrintResolutions);
    this.sizes$ = this.store.select(fromMangol.getPrintSizes);
    this.selectedLayout$ = this.store.select(fromMangol.getPrintSelectedLayout);
    this.selectedResolution$ = this.store.select(fromMangol.getPrintSelectedResolution);
    this.selectedSize$ = this.store.select(fromMangol.getPrintSelectedSize);

    this.printConfigSubscription = this.printConfig$.subscribe(config => {
      if (config.hasOwnProperty('dictionary')) {
        this.store.dispatch(PrintActions.setDictionary({dictionary: config.dictionary}));
      }
      if (config.hasOwnProperty('sizes')) {
        this.store.dispatch(PrintActions.setSizes({sizes: config.sizes}));
      }
      if (config.hasOwnProperty('resolutions')) {
        this.store.dispatch(PrintActions.setResolutions({resolutions: config.resolutions}));
      }
      if (config.hasOwnProperty('layouts')) {
        this.store.dispatch(PrintActions.setLayouts({layouts: config.layouts}));
      }
    });
  }

  ngOnInit() {
    // Initialize the reactive form
    this.form = this.fb.group({
      layout: ['', Validators.required],
      size: ['', Validators.required],
      resolution: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    if (this.printConfigSubscription) {
      this.printConfigSubscription.unsubscribe();
    }
  }

  /**
   * Performs the print action
   */
  print(): void {
    combineLatest(
      this.store.select(fromMangol.getMap).pipe(filter(m => m !== null)),
      this.selectedLayout$,
      this.selectedResolution$,
      this.selectedSize$
    )
      .pipe(take(1))
      .subscribe(([m, layout, resolution, size]) => {
        this.printInProgress = true;
        const width = Math.round(
          ((layout.type === 'landscape' ? size.width : size.height) *
            resolution) /
            25.4
        );
        const height = Math.round(
          ((layout.type === 'landscape' ? size.height : size.width) *
            resolution) /
            25.4
        );
        const mapSize = this.mapService.map.getSize();
        const extent = this.mapService.map.getView().calculateExtent(mapSize);
        this.mapService.map.once('rendercomplete', (event: any) => {
          const canvas = event.context.canvas;
          const data = canvas.toDataURL('image/jpeg');
          const pdf = new jsPDF(layout.type, undefined, size.id);
          pdf.addImage(
            data,
            'JPEG',
            0,
            0,
            layout.type === 'landscape' ? size.width : size.height,
            layout.type === 'landscape' ? size.height : size.width
          );
          pdf.save('map.pdf');
          this.mapService.map.setSize(mapSize);
          this.mapService.map.getView().fit(extent, { size: mapSize });
          this.printInProgress = false;
        });
        const printSize: [number, number] = [width, height];
        this.mapService.map.setSize(printSize);
        this.mapService.map.getView().fit(extent, { size: printSize });
        this.mapService.map.renderSync();
      });
  }

  /**
   * Layout change
   * @param evt
   */
  onLayoutChange(evt: MatSelectChange) {
    this.store.dispatch(PrintActions.setSelectedLayout({selectedLayout: !!evt.value ? <PrintLayout>evt.value : null}));
  }

  /**
   * Size change
   * @param evt
   */
  onSizeChange(evt: MatSelectChange) {
    this.store.dispatch(PrintActions.setSelectedSize({selectedSize: !!evt.value ? <PrintSize>evt.value : null}));
  }

  /**
   * Resolution change
   * @param evt
   */
  onResolutionChange(evt: MatSelectChange) {
    this.store.dispatch(PrintActions.setSelectedResolution({selectedResolution: !!evt.value ? <number>evt.value : null}));
  }
}
