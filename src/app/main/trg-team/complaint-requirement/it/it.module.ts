import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItComponent } from './it/it.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';

const routes = [
  {
      path: '',
      component: ItComponent
  },
]

@NgModule({
  declarations: [
    ItComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ItModule { }
