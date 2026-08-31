import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartComponent } from './chart.component';

import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: ChartComponent
    }
];

@NgModule({
    declarations: [
        ChartComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule

    ]
})

export class ChartModule {
}
