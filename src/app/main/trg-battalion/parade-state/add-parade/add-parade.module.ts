import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddParadeComponent } from './add-parade.component';
import { MaterialModule } from '../../../../material/material.module';

const routes = [
    {
        path: '',
        component: AddParadeComponent
    },
];

@NgModule({
    declarations: [
        AddParadeComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class AddParadeModule {
}
