import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrillMarksComponent } from './drill-marks.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: DrillMarksComponent
    },
    {
        path:'add-drill-marks',
        loadChildren:()=>import('../drill-marks/add-drill-marks/add-drill-marks.module').then(m=>m.AddDrillMarksModule)
    },
    {
        path:'view-drill-marks',
        loadChildren:()=>import('../drill-marks/add-drill-marks/add-drill-marks.module').then(m=>m.AddDrillMarksModule)
    }
];

@NgModule({
    declarations: [
        DrillMarksComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class DrillMarksModule {
}
