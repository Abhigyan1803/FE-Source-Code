
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItComplaintsComponent } from './it-complaints.component';

import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: ItComplaintsComponent
    },

  
    {
        path:'view',
        loadChildren:()=>import('../it-complaints/add-it-complaints/add-it-complaints.module')
        .then(m=>m.AddITComplaintsModule)
    }
];

@NgModule({
    declarations: [
        ItComplaintsComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  ItComplaintsModule {
}
