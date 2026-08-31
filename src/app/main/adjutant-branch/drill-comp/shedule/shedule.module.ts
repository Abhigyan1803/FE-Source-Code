import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheduleComponent } from './shedule.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: SheduleComponent
    },
    {
        path:'add',
        loadChildren:()=>import('../shedule/add-schedule/add-schedule.module').then(m=>m.AddScheduleModule)
    },
    {
        path:'view',
        loadChildren:()=>import('../shedule/add-schedule/add-schedule.module').then(m=>m.AddScheduleModule)
    }
];

@NgModule({
    declarations: [
        SheduleComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class SheduleModule {
}
