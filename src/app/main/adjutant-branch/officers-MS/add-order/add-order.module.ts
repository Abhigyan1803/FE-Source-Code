import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOrderComponent } from './add-order.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: AddOrderComponent
    },
];

@NgModule({
    declarations: [
        AddOrderComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class AddOrderModule {
}
