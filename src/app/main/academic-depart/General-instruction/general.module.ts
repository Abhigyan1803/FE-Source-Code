import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GENERAL_ROUTES } from './general.routes';
import { ExamCellComponent } from './exam-cell/exam-cell.component';
import { HindiCellComponent } from './hindi-cell/hindi-cell.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(GENERAL_ROUTES),

  ]
})

export class GeneralModule { }
