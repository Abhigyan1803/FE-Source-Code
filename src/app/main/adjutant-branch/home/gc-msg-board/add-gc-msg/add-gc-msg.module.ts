import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddGcMsgComponent } from './add-gc-msg.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: AddGcMsgComponent
    },
];

@NgModule({
    declarations: [
        AddGcMsgComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class AddGcMsgModule {
}
