import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BMT1_ASSESSMENT_ROUTES } from './bmt1-assessment.routes';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(BMT1_ASSESSMENT_ROUTES),

  ]
})

export class BMT1ASSESSMENTModule { }
