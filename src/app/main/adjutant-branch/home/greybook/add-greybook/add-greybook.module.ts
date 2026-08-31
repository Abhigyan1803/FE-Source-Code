import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddGreybookComponent } from './add-greybook.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: AddGreybookComponent
    },
];

@NgModule({
    declarations: [
        AddGreybookComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class AddGreybookModule {
}
