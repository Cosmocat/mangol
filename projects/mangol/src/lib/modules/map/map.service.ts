import { Injectable } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Map from 'ol/Map';

import { MangolLayer } from '../../classes/Layer';
import { MangolConfigView } from '../../interfaces/config-view.interface';
import { MangolConfigMap } from '../../interfaces/config-map.interface';
import BaseLayer from 'ol/layer/Base';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor() {}

  map;

  getDefaultMap(): {
    target: string;
    layers: MangolLayer[];
    view: MangolConfigView;
  } {
    return {
      target: 'my-map',
      layers: [
        new MangolLayer({
          name: 'OpenStreetMap Layer',
          layer: new TileLayer({
            source: new OSM()
          })
        })
      ],
      view: {
        projection: 'EPSG:3857',
        center: fromLonLat([19.3956393810065, 47.168464955013], 'EPSG:3857'),
        zoom: 4,
        enableRotation: true
      }
    };
  }

  setMap(map: MangolConfigMap) {
    const mapView = new View(map.view);
    this.map = new Map({
      target: map.target,
      view: mapView
    });
  }
}
