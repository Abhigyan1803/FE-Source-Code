import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCyberPolicyComponent } from './add-cyber-policy.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: AddCyberPolicyComponent
    },
];

@NgModule({
    declarations: [
        AddCyberPolicyComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]        
})

export class AddCyberPolicyModule {
}
