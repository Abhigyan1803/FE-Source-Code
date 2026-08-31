import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAroComponent } from './add-aro.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: AddAroComponent
    },
];

@NgModule({
    declarations: [
        AddAroComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class AddAroModule {
}
