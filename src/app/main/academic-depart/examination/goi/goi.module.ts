import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoiComponent } from './goi.component';
import { MaterialModule } from 'app/material/material.module';
import { AddGoiComponent } from './add-goi/add-goi.component';


const routes = [
    {
        path: '',
        component: GoiComponent
    },
    {
        path:'add-goi',
        loadChildren:()=>import('./add-goi/add-goi.module').then(m=>m.AddGoiModule)
    },
    {
        path:'view-goi',
        loadChildren:()=>import('./add-goi/add-goi.module').then(m=>m.AddGoiModule)
    }
   
];

@NgModule({
    declarations: [
        GoiComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class GoiModule {
}
