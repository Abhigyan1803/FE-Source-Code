import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCadetComponent } from './add-cadet.component';

import { MaterialModule } from 'app/material/material.module';
const routes = [
    {
        path: '',
        component: AddCadetComponent
    },
];

@NgModule({
    declarations: [
        AddCadetComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule,
        
       ]
})

export class AddCadetModule {
}
