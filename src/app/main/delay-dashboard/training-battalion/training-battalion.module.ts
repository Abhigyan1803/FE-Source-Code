import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingBattalionComponent } from './training-battalion.component';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
      path: '',
      component: TrainingBattalionComponent
  }
]

@NgModule({
  declarations: [
    TrainingBattalionComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule, FormsModule, ReactiveFormsModule,

    RouterModule.forChild(routes),
  ]
})
export class TrainingBattalionModule { }
