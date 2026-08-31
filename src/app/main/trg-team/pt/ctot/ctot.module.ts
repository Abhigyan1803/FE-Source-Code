import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CtotComponent } from './ctot.component';
import { MaterialModule } from 'app/material/material.module';



const routes = [
    {
        path: '',
        component: CtotComponent
    }
];

@NgModule({
    declarations: [
        CtotComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule, MaterialModule
     ]
})

export class CtotModule {
}
