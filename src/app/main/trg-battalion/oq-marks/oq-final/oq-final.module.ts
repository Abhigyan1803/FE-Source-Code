import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from 'app/material/material.module';
import { OqFinalComponent } from './oq-final.component';


const routes = [
    {
        path: '',
        component: OqFinalComponent,

    },
   
];

@NgModule({
    declarations: [
        OqFinalComponent,
      
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
         MaterialModule
    ]
})

export class OqMarksFinalModule {
}
