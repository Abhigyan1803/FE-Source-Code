import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdjutantOrdersComponent } from './adjutant-orders.component';

import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';

const routes = [
  {
      path: '',
      component:AdjutantOrdersComponent  
  },
];

@NgModule({
  declarations: [
    AdjutantOrdersComponent
  ],
  imports: [
    CommonModule,  
    RouterModule.forChild(routes),
    MaterialModule

  ]
})
export class AdjutantOrdersModule { }
