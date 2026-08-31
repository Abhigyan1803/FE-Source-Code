
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintsComponent } from './complaints.component';

import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddComplaintsComponent } from './add-complaints/add-complaints.component';

const routes = [
    {
        path: '',
        component: ComplaintsComponent
    },
    {
        path:'add-complaints',
        loadChildren:()=>import('../complaints/add-complaints/add-complaints.module').then(m=>m.AddComplaintsModule)
    },
    {
        path:'view-complaints',
        loadChildren:()=>import('../complaints/add-complaints/add-complaints.module').then(m=>m.AddComplaintsModule)
    }
];

@NgModule({
    declarations: [
        ComplaintsComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  ComplaintsModule {
}
