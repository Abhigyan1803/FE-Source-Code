import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RotComponent } from './rot.component';
import { MaterialModule } from 'app/material/material.module';



const routes = [
    {
        path: '',
        component: RotComponent
    }
];

@NgModule({
    declarations: [
        RotComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule, MaterialModule
     ]
})

export class RotModule {
}
