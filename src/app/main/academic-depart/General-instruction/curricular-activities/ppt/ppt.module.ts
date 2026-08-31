import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PptComponent } from './ppt.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: PptComponent
    },
    {
        path:'add-ppt',
        loadChildren:()=>import('./add-ppt/add-ppt.module').then(m=>m.AddPPTModule)
    },
    {
        path:'view-ppt',
        loadChildren:()=>import('./add-ppt/add-ppt.module').then(m=>m.AddPPTModule)
    }
];

@NgModule({
    declarations: [
        PptComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class PptModule {
}
