import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoliciesComponent } from './policies.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: PoliciesComponent
    },
    {
        path:'add-policies',
        loadChildren:()=>import('../policies/add-policies/add-policies.module').then(m=>m.AddPoliciesModule)
    },
    {
        path:'view-policies',
        loadChildren:()=>import('../policies/add-policies/add-policies.module').then(m=>m.AddPoliciesModule)
    }
];

@NgModule({
    declarations: [
        PoliciesComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class PoliciesModule {
}
