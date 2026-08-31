import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewGcPunishmentsComponent } from './view-gc-punishments.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';

const routes = [
  {
      path: '',
      component: ViewGcPunishmentsComponent,
  },
];


@NgModule({
  declarations: [
    ViewGcPunishmentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    MaterialModule

  ]
})
export class ViewGcPunishmentsModule { }
