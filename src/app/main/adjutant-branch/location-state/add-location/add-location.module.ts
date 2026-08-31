import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddLocationComponent } from './add-location.component';
import { MaterialModule } from '../../../../material/material.module';

const routes = [
    {
        path: '',
        component: AddLocationComponent
    },
];

@NgModule({
    declarations: [
        AddLocationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class AddLocationModule {
}
