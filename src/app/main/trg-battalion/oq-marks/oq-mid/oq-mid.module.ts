import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from 'app/material/material.module';

import { OqMidComponent } from './oq-mid.component';


const routes = [
    {
        path: '',
        component: OqMidComponent,

    },
   
];

@NgModule({
    declarations: [
        OqMidComponent,
      
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
         MaterialModule
    ]
})

export class OqMarksMidModule {
}
