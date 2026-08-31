import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';

const routes = [
  {
      path: '',
      component: ReportsComponent
  }
]


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, MaterialModule
  ]
})
export class ReportsModule { }
