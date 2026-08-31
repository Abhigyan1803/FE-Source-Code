import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicDepartmentComponent } from './academic-department.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes = [
  {
      path: '',
      component: AcademicDepartmentComponent
  }
]

@NgModule({
  declarations: [
    AcademicDepartmentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule, FormsModule, ReactiveFormsModule,

    RouterModule.forChild(routes),

  ]
})
export class AcademicDepartmentModule { }
