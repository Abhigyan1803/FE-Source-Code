import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {TransportComponent} from './transport.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: TransportComponent
    }
];

@NgModule({
    declarations: [
        TransportComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule

    ]
})

export class TransportModule {
}
