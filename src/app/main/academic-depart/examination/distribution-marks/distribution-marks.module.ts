import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistributionMarksComponent } from './distribution-marks.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: DistributionMarksComponent
    },
    {
        path:'add-distribution-marks',
        loadChildren:()=>import('./add-distribution-marks/add-distribution-marks.module').then(m=>m.AddDistributionMarksModule)
    },
    {
        path:'view-distribution-marks',
        loadChildren:()=>import('./add-distribution-marks/add-distribution-marks.module').then(m=>m.AddDistributionMarksModule)
    }
   
];

@NgModule({
    declarations: [
        DistributionMarksComponent,
        
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class DistributionMarksModule {
}
