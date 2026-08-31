
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Bmt2finalComponent } from './bmt2final.component';

import {MaterialModule} from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: Bmt2finalComponent
    },
    {
        path:'add-bmt2final',
        loadChildren:()=>import('./add-bmt2final/add-bmt2final.module').then(m=>m.AddBmt2finalModule)
    },
    {
        path:'view-bmt2final',
        loadChildren:()=>import('./add-bmt2final/add-bmt2final.module').then(m=>m.AddBmt2finalModule)
    }
];

@NgModule({
    declarations: [
        Bmt2finalComponent,
        
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class Bmt2finalModule {
}
