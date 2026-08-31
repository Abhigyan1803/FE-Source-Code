import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BroComponent } from './bro.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';

const routes = [
  {
      path: '',
      component: BroComponent,
  }
];


@NgModule({
  declarations: [
    BroComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
     MaterialModule
  ]
})
export class BroModule { }
