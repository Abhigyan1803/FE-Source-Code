import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeeklyProgramsComponent } from './weekly-programs.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: WeeklyProgramsComponent
    },
    {
              path: 'add-program', loadChildren: () => import('./add-weekly-program/add-weekly-program.module').then(m => m.AddWeeklyProgramModule) ,
    },
    {
              path: 'view-program', loadChildren: () => import('./add-weekly-program/add-weekly-program.module').then(m => m.AddWeeklyProgramModule) ,
    }
    
];

@NgModule({
    declarations: [
        WeeklyProgramsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,MaterialModule
     ]
})

export class WeeklyProgramsModule {
}
