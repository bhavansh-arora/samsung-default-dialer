import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncallPageRoutingModule } from './incall-routing.module';

import { IncallPage } from './incall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncallPageRoutingModule
  ],
  declarations: [IncallPage]
})
export class IncallPageModule {}
