import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ACADEMIC_DEPARTMENT_ROUTES } from './academic-depart.routes';


@NgModule({
  declarations: [


  
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ACADEMIC_DEPARTMENT_ROUTES),

  ]
})

export class AcademicDepartmentModule { }
