import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DayWiseComponent } from './day-wise.component';
import { MaterialModule } from 'app/material/material.module';
import { AddDayWiseComponent } from './add-day-wise/add-day-wise.component';

const routes = [
    {
        path: '',
        component: DayWiseComponent
    },
    {
        path:'add-day',
        loadChildren:()=>import('./add-day-wise/add-day-wise.module').then(m=>m.AddDayModule)
    },
    {
        path:'view-day',
        loadChildren:()=>import('./add-day-wise/add-day-wise.module').then(m=>m.AddDayModule)
    }
   
];

@NgModule({
    declarations: [
        DayWiseComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class DayModule {
}
