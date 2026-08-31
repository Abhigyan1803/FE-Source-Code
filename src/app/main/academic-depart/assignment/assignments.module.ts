import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ASSIGNMENTS_ROUTES } from './assignments.routes';


@NgModule({
    declarations: [
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(ASSIGNMENTS_ROUTES),
        
    ]
})

export class AssignmentsModule { }
