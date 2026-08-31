import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CyberPolicyComponent } from './cyber-policy.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: CyberPolicyComponent
    },
    { path: 'add-cyber-policy', loadChildren: () => import('./add-cyber-policy/add-cyber-policy.module').then(m => m.AddCyberPolicyModule) },
    { path: 'view-cyber-policy', loadChildren: () => import('./add-cyber-policy/add-cyber-policy.module').then(m => m.AddCyberPolicyModule) },
    

];

@NgModule({
    declarations: [
        CyberPolicyComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class CentralLibraryModule {
}
