import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NominalComponent} from './nominal.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: NominalComponent
    }
];

@NgModule({
    declarations: [
        NominalComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule

    ]
})

export class NominalModule {
}
