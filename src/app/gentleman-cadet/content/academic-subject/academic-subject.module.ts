import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AcademicSubjectComponent } from './academic-subject.component';

const routes = [
    {
        path: '',
        component:AcademicSubjectComponent  
    },
];

@NgModule({
    declarations: [
        AcademicSubjectComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule, 
        NgbModule
        
    ]
})

export class AcademicSubjectModule {
}
