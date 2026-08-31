import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SotComponent } from './sot.component';
import { MaterialModule } from 'app/material/material.module';



const routes = [
    {
        path: '',
        component: SotComponent
    }
];

@NgModule({
    declarations: [
        SotComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule, MaterialModule
     ]
})

export class SotModule {
}
