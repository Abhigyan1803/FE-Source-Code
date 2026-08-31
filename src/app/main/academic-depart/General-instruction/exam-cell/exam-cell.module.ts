import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamCellComponent } from './exam-cell.component';
import { MaterialModule } from 'app/material/material.module';
import { AddExamComponent } from './add-exam/add-exam.component';



const routes = [
    {
        path: '',
        component: ExamCellComponent
    },
    {
        path:'add-exam',
        loadChildren:()=>import('./add-exam/add-exam.module').then(m=>m.AddExamModule)
    },
    {
        path:'view-exam',
        loadChildren:()=>import('./add-exam/add-exam.module').then(m=>m.AddExamModule)
    }
];

@NgModule({
    declarations: [
        ExamCellComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class ExamModule {
}
