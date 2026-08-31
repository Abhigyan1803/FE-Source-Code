
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinalTermComponent } from './final-term.component';

import {MaterialModule} from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: FinalTermComponent
    },
    {
        path:'add-final',
        loadChildren:()=>import('./add-final-term/add-final-term.module').then(m=>m.AddFinalTermModule)
    },
    {
        path:'view-final',
        loadChildren:()=>import('./add-final-term/add-final-term.module').then(m=>m.AddFinalTermModule)
    }
];

@NgModule({
    declarations: [
        FinalTermComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class FinalTermModule {
}
