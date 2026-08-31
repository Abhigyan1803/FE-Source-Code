import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SopComponent } from './sop.component';
import { MaterialModule } from '../../../../material/material.module';

const routes = [
    {
        path: '',
        component: SopComponent
    },
    {  path: 'add-sop', loadChildren: () => import('./add-sop/add-sop.module').then(m => m.AddSOPModule) },
    {  path: 'view-sop', loadChildren: () => import('./add-sop/add-sop.module').then(m => m.AddSOPModule) }
];

@NgModule({
    declarations: [
        SopComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        
         ]
})

export class SOPModule {
}
