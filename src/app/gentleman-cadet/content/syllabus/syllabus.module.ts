import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SyllabusComponent } from './syllabus.component';

const routes = [
    {
        path: '',
        component:SyllabusComponent  
    },
];

@NgModule({
    declarations: [
        SyllabusComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule, 
        NgbModule
        
    ]
})

export class SyllabusModule {
}
