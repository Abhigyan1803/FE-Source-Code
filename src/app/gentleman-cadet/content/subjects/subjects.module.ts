import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubjectsComponent } from './subjects.component';

const routes = [
    {
        path: '',
        component:SubjectsComponent  
    },
];

@NgModule({
    declarations: [
        SubjectsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule, 
        NgbModule
        
    ]
})

export class SubjectsModule {
}
