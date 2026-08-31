import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleOfExercisesComponent } from './schedule-of-exercises.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: ScheduleOfExercisesComponent
    },
    { path: 'add-schedule', loadChildren: () => import('./add-schedule/add-schedule.module').then(m => m.AddScheduleModule) },
    { path: 'view-schedule', loadChildren: () => import('./add-schedule/add-schedule.module').then(m => m.AddScheduleModule) }
];

@NgModule({
    declarations: [
        ScheduleOfExercisesComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class ScheduleOfExercisesModule {
}
