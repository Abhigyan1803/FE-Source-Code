
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MidTermComponent } from './mid-term.component';

import {MaterialModule} from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: MidTermComponent
    },
    {
        path:'add-mid',
        loadChildren:()=>import('./add-mid-term/add-mid-term.module').then(m=>m.AddMidTermModule)
    },
    {
        path:'view-mid',
        loadChildren:()=>import('./add-mid-term/add-mid-term.module').then(m=>m.AddMidTermModule)
    }
];

@NgModule({
    declarations: [
        MidTermComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class MidTermModule {
}
