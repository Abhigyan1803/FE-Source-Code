import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportComponent } from './report.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: ReportComponent
    }
];

@NgModule({
    declarations: [
        ReportComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule

    ]
})

export class ReportModule {
}
