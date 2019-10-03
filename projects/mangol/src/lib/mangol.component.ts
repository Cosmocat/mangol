import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Map from 'ol/Map';
import { Observable, from } from 'rxjs';
import { take } from 'rxjs/operators';

import { MangolConfig } from './interfaces/config.interface';
import * as ConfigActions from './store/config/config.actions';
import * as MangolActions from './store/mangol.actions';
import * as fromMangol from './store/mangol.reducers';
import * as SidebarActions from './store/sidebar/sidebar.actions';

import { addCommon as addCommonProjections } from 'ol/proj.js';
import { register } from 'ol/proj/proj4.js';
import proj4 from 'proj4';
import { MangolConfigMap } from './interfaces/config-map.interface';
import { MapService } from './modules/map/map.service';

@Component({
  selector: 'mangol',
  templateUrl: './mangol.component.html',
  styleUrls: ['./mangol.component.scss']
})
export class MangolComponent implements OnInit {
  @HostBinding('class')
  class = 'mangol';
  @Input()
  config: MangolConfig;

  hasSidebar$: Observable<boolean>;
  sidebarOpened$: Observable<boolean>;
  sidebarMode$: Observable<string>;
  map$: Observable<MangolConfigMap>;

  constructor(private store: Store<fromMangol.MangolState>, private mapService: MapService) {
    this.sidebarOpened$ = this.store.select(fromMangol.getSidebarOpened);
    this.sidebarMode$ = this.store.select(fromMangol.getSidebarMode);
    this.hasSidebar$ = this.store.select(fromMangol.getHasSidebar);
    this.map$ = this.store.select(fromMangol.getMap);
  }

  ngOnInit() {
    addCommonProjections();
    register(proj4);

    this.store.dispatch(MangolActions.clearState());
    this.store.dispatch(ConfigActions.setConfig({ config: this.config }));
    if (typeof this.config !== 'undefined' && this.config !== null) {
      // register the config in the Store
      this.store.dispatch(SidebarActions.setHasSidebar({ hasSidebar: !!this.config.sidebar }));
      if (!!this.config.sidebar) {
        /**
         * Basic sidebar options
         */
        if (!!this.config.sidebar.collapsible) {
          this.store.dispatch(SidebarActions.setCollapsible({ collapsible: this.config.sidebar.collapsible }));
        }
        if (!!this.config.sidebar.mode) {
          this.store.dispatch(SidebarActions.setMode({ mode: this.config.sidebar.mode }));
        }
        if (!!this.config.sidebar.opened) {
          this.store.dispatch(SidebarActions.setOpened({ opened: this.config.sidebar.opened }));
        }
        if (!!this.config.sidebar.title) {
          this.store.dispatch(SidebarActions.setTitle({ title: this.config.sidebar.title }));
        }
      }
    } else {
      this.store.dispatch(SidebarActions.setHasSidebar({ hasSidebar: false }));
    }
  }

  onOpenedChange(evt: boolean) {
    this.store
      .select(fromMangol.getSidebarOpened)
      .pipe(take(1))
      .subscribe(opened => {
        if (opened !== evt) {
          this.store.dispatch(SidebarActions.toggle());
        }
        this.store
          .select(fromMangol.getMap)
          .pipe(take(1))
          .subscribe((m: MangolConfigMap) => {
            if (m !== null) {
              this.mapService.map.updateSize();
            }
          });
      });
  }
}
