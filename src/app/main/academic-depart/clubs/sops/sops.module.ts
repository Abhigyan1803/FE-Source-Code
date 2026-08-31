import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { SopsComponent } from './sops.component';

const routes = [
    {
        path: '',
        component: SopsComponent
    },
    {
        path:'add-sop',
        loadChildren:()=>import('./add-sops/add-sops.module').then(m=>m.AddSopsModule)
    },
    {
        path:'view-sop',
        loadChildren:()=>import('./add-sops/add-sops.module').then(m=>m.AddSopsModule)
    }
   
];

@NgModule({
    declarations: [
        SopsComponent,
       
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class SopsModule {
}
