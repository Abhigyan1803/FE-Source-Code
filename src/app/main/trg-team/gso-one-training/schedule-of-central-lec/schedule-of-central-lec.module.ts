import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleOfCentralLecComponent } from './schedule-of-central-lec.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: ScheduleOfCentralLecComponent
    },
    { path: 'add-schedule', loadChildren: () => import('./add-schedule-of-central-lec/add-schedule-of-central-lec.module').then(m => m.AddScheduleOfCentralLecModule) },
    { path: 'view-schedule', loadChildren: () => import('./add-schedule-of-central-lec/add-schedule-of-central-lec.module').then(m => m.AddScheduleOfCentralLecModule) }
];

@NgModule({
    declarations: [
        ScheduleOfCentralLecComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class ScheduleOfCentralLecModule {
}
