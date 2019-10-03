import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import {
  MangolConfigFeatureInfoItem,
  MangolConfigLayertreeItem,
  MangolConfigMeasureItem
} from '../../interfaces/config-toolbar.interface';
import { MangolConfig } from '../../interfaces/config.interface';
import { MangolConfigPrintItem } from './../../interfaces/config-toolbar.interface';
import * as FeatureinfoActions from './../../store/featureinfo/featureinfo.actions';
import * as fromMangol from './../../store/mangol.reducers';
import * as LayertreeActions from './../../store/layertree/layertree.actions';
import * as MeasureActions from './../../store/measure/measure.actions';
import * as PrintActions from './../../store/print/print.actions';
import * as SidebarActions from './../../store/sidebar/sidebar.actions';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'mangol-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = 'mangol-tabs';

  selectedModule$: Observable<string>;

  title$: Observable<string>;
  /** Layertree */
  hasLayertree$: Observable<boolean>;
  layertreeDisabled$: Observable<boolean>;
  layertreeTitle$: Observable<string>;
  /** FeatureInfo */
  hasFeatureinfo$: Observable<boolean>;
  featureinfoDisabled$: Observable<boolean>;
  featureinfoTitle$: Observable<string>;
  /** MeasureInfo */
  hasMeasure$: Observable<boolean>;
  measureDisabled$: Observable<boolean>;
  measureTitle$: Observable<string>;
  /** Print */
  hasPrint$: Observable<boolean>;
  printDisabled$: Observable<boolean>;
  printTitle$: Observable<string>;

  configSubscription: Subscription;

  items: string[] = [];

  constructor(private store: Store<fromMangol.MangolState>) {
    this.selectedModule$ = this.store.select(fromMangol.getSidebarSelectedModule);
    this.title$ = this.store.select(fromMangol.getSidebarTitle);
    /** Layertree */
    this.hasLayertree$ = this.store.select(fromMangol.getHasSidebar);
    this.layertreeTitle$ = this.store.select(fromMangol.getLayertreeTitle);
    this.layertreeDisabled$ = this.store.select(fromMangol.getLayertreeDisabled);
    /** Featureinfo */
    this.hasFeatureinfo$ = this.store.select(fromMangol.getHasFeatureInfo);
    this.featureinfoTitle$ = this.store.select(fromMangol.getFeatureInfoTitle);
    this.featureinfoDisabled$ = this.store.select(fromMangol.getFeatureInfoDisabled);
    /** Measure */
    this.hasMeasure$ = this.store.select(fromMangol.getHasMeasure);
    this.measureTitle$ = this.store.select(fromMangol.getMeasureTitle);
    this.measureDisabled$ = this.store.select(fromMangol.getMeasureDisabled);
    /** Print */
    this.hasPrint$ = this.store.select(fromMangol.getHasPrint);
    this.printTitle$ = this.store.select(fromMangol.getPrintTitle);
    this.printDisabled$ = this.store.select(fromMangol.getPrintDisabled);
  }

  ngOnInit() {
    this.configSubscription = this.store
      .select(fromMangol.getConfig)
      .pipe(filter(config => config !== null))
      .subscribe((config: MangolConfig) => {
        this.items = [];
        /** Layertree */
        const hasLayertree =
          typeof config !== 'undefined' &&
          config !== null &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.layertree;
        this.store.dispatch(LayertreeActions.hasLayertree({hasLayertree}));
        if (hasLayertree) {
          this.items.push('layertree');
          const layertree: MangolConfigLayertreeItem =
            config.sidebar.toolbar.layertree;
          if (layertree.hasOwnProperty('disabled')) {
            this.store.dispatch(LayertreeActions.setDisabled({disabled: layertree.disabled}));
          }
          if (layertree.hasOwnProperty('title')) {
            this.store.dispatch(LayertreeActions.setTitle({title: layertree.title}));
          }
        }
        /** Featureinfo */
        const hasFeatureinfo =
          typeof config !== 'undefined' &&
          config !== null &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.featureinfo;
        this.store.dispatch(FeatureinfoActions.hasFeatureInfo({hasFeatureinfo}));
        if (hasFeatureinfo) {
          this.items.push('featureinfo');
          const featureinfo: MangolConfigFeatureInfoItem =
            config.sidebar.toolbar.featureinfo;
          if (featureinfo.hasOwnProperty('disabled')) {
            this.store.dispatch(FeatureinfoActions.setDisabled({disabled: featureinfo.disabled}));
          }
          if (featureinfo.hasOwnProperty('title')) {
            this.store.dispatch(FeatureinfoActions.setTitle({title: featureinfo.title}));
          }
        }
        /** Measure */
        const hasMeasure =
          typeof config !== 'undefined' &&
          config !== null &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.measure;
        this.store.dispatch(MeasureActions.hasMeasure({hasMeasure}));
        if (hasMeasure) {
          this.items.push('measure');
          const measure: MangolConfigMeasureItem =
            config.sidebar.toolbar.measure;
          if (measure.hasOwnProperty('disabled')) {
            this.store.dispatch(MeasureActions.setDisabled({disabled: measure.disabled}));
          }
          if (measure.hasOwnProperty('title')) {
            this.store.dispatch(MeasureActions.setTitle({title: measure.title}));
          }
        }
        /** Print */
        const hasPrint =
          typeof config !== 'undefined' &&
          config !== null &&
          !!config.sidebar &&
          !!config.sidebar.toolbar &&
          !!config.sidebar.toolbar.print;
        this.store.dispatch(PrintActions.hasPrint({hasPrint}));
        if (hasPrint) {
          this.items.push('print');
          const print: MangolConfigPrintItem = config.sidebar.toolbar.print;
          if (print.hasOwnProperty('disabled')) {
            this.store.dispatch(PrintActions.setDisabled({disabled: print.disabled}));
          }
          if (print.hasOwnProperty('title')) {
            this.store.dispatch(PrintActions.setTitle({title: print.title}));
          }
        }

        if (this.items.length > 0) {
          this.store.dispatch(SidebarActions.setSelectedModule({ selectedModule: this.items[0] }));
        }
      });
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  toggleSidebar() {
    this.store.dispatch(SidebarActions.toggle());
  }

  selectTab(tabName: string) {
    this.store.dispatch(SidebarActions.setSelectedModule({ selectedModule: tabName }));
  }
}
