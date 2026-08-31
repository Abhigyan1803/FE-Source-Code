import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingTeamComponent } from './training-team.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
      path: '',
      component: TrainingTeamComponent
  }
]

@NgModule({
  declarations: [
    TrainingTeamComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class TrainingTeamModule { }
