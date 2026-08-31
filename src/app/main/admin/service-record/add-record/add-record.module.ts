import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRecordComponent } from './add-record.component';

import { MaterialModule } from 'app/material/material.module';
// import { MatStepperModule } from '@angular/material/stepper';
const routes = [
    {
        path: '',
        component: AddRecordComponent
    },
  
];

@NgModule({
    declarations: [
        AddRecordComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class AddRecordModule {
}
