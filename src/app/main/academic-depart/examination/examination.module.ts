import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EXAMINATION_ROUTES } from './examination.routes';
// import { DistributionMarksComponent } from './distribution-marks/distribution-marks.component';
// import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';


@NgModule({
    declarations: [
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(EXAMINATION_ROUTES),
        
    ]
})

export class ExamniationModule { }
