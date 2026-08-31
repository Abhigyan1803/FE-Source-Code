import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CyberComponent } from './cyber.component';
import { MaterialModule } from 'app/material/material.module';
import { AddCyberComponent } from './add-cyber/add-cyber.component';

const routes = [
    {
        path: '',
        component: CyberComponent
    },
    {
        path:'add-cyber',
        loadChildren:()=>import('./add-cyber/add-cyber.module').then(m=>m.AddCyberModule)
    },
    {
        path:'view-cyber',
        loadChildren:()=>import('./add-cyber/add-cyber.module').then(m=>m.AddCyberModule)
    }
];

@NgModule({
    declarations: [
        CyberComponent,
               
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class CyberModule {
}
