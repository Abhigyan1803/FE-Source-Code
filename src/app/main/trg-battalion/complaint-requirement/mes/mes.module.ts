import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesComponent } from './mes/mes.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';

const routes = [
  {
      path: '',
      component: MesComponent
  },
]

@NgModule({
  declarations: [
    MesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class MesModule { }
