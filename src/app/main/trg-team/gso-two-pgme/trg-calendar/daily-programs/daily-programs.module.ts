import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DailyProgramsComponent } from './daily-programs.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: DailyProgramsComponent
    },
    {
        path: 'add-program', loadChildren: () => import('./add-daily-program/add-daily-program.module').then(m => m.AddDailyProgramModule),
    },
    {
        path: 'view-program', loadChildren: () => import('./add-daily-program/add-daily-program.module').then(m => m.AddDailyProgramModule),
    }
];

@NgModule({
    declarations: [
        DailyProgramsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,MaterialModule
    ]
})

export class DailyProgramsModule {
}
