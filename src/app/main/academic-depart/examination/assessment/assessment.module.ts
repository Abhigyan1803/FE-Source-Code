import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ASSESSMENT_ROUTES } from './assessment.routes';
// import { AddCreditExellenceComponent } from './credit-exellence/add-credit-exellence/add-credit-exellence.component';
// import { DistributionMarksComponent } from './distribution-marks/distribution-marks.component';
// import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';


@NgModule({
    declarations: [
  
    
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(ASSESSMENT_ROUTES),
        
    ]
})

export class AssessmentModule { }
