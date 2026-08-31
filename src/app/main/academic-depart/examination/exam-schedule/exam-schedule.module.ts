import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamScheduleComponent } from './exam-schedule.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: ExamScheduleComponent
    },
    {
        path:'add-exam-marks',
        loadChildren:()=>import('./add-exam-schedule/add-exam-schedule.module').then(m=>m.AddExamScheduleModule)
    },
    {
        path:'view-exam-marks',
        loadChildren:()=>import('./add-exam-schedule/add-exam-schedule.module').then(m=>m.AddExamScheduleModule)
    }
   
];

@NgModule({
    declarations: [
        ExamScheduleComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class ExamScheduleModule {
}
