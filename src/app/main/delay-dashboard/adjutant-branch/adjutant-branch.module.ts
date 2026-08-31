import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdjutantBranchComponent } from './adjutant-branch.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
      path: '',
      component: AdjutantBranchComponent
  }
]

@NgModule({
  declarations: [
    AdjutantBranchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AdjutantBranchModule { }
