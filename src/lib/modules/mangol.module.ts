import { MangolMaterialModule } from './_shared/mangol-material.module';
import { NgModule } from '@angular/core';

import { MangolMapModule } from './map/_index.module';
import { MangolContainerModule } from './container/_index.module';
import { MangolSidebarModule } from './sidebar/_index.module';
import { MangolLayertreeModule } from './layertree/_index.module';
import { MangolFeatureInfoModule } from './featureinfo/_index.module';
import { MangolMeasureModule } from './measure/_index.module';
import { MangolPrintModule } from './print/_index.module';

import { MangolMapService } from './../services/map.service';

@NgModule({
  imports: [
    MangolContainerModule,
    MangolLayertreeModule,
    MangolMapModule,
    MangolMeasureModule,
    MangolPrintModule,
    MangolSidebarModule,
    MangolFeatureInfoModule,
    MangolMaterialModule
  ],
  exports: [
    MangolContainerModule,
    MangolLayertreeModule,
    MangolMapModule,
    MangolMeasureModule,
    MangolPrintModule,
    MangolSidebarModule,
    MangolFeatureInfoModule,
    MangolMaterialModule
  ],
})
export class MangolModule { }
