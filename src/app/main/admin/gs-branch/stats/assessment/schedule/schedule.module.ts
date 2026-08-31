import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule.component';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';

const routes = [
    {
        path: '',
        component: ScheduleComponent
    },
    {
        path:'add-schedule',
        loadChildren:()=>import('../schedule/add-schedule/add-schedule.module').then(m=>m.AddScheduleModule)
    },
    {
        path:'view-schedule',
        loadChildren:()=>import('../schedule/add-schedule/add-schedule.module').then(m=>m.AddScheduleModule)
    }
];

@NgModule({
    declarations: [
        ScheduleComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class ScheduleModule {
}
