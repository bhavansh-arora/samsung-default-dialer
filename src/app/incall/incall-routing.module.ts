import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncallPage } from './incall.page';

const routes: Routes = [
  {
    path: '',
    component: IncallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncallPageRoutingModule {}
