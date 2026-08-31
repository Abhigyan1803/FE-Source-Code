
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcademicSyllabusComponent } from './academic-syllabus.component';

import {MaterialModule} from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: AcademicSyllabusComponent
    },
    {
        path:'add-syllabus',
        loadChildren:()=>import('./add-acad-syllabus/add-acad-syllabus.module').then(m=>m.AddAcadSyllabusModule)
    },
    {
        path:'view-syllabus',
        loadChildren:()=>import('./add-acad-syllabus/add-acad-syllabus.module').then(m=>m.AddAcadSyllabusModule)
    }
];

@NgModule({
    declarations: [
        AcademicSyllabusComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class AcademicSyllabusModule {
}
