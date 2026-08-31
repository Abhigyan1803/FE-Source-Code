import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EqtnComponent } from './eqtn.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: EqtnComponent
    },
    {
        path:'add-eqtn',
        loadChildren:()=>import('./add-eqtn/add-eqtn.module').then(m=>m.AddEqtnModule)
    },
    {
        path:'view-eqtn',
        loadChildren:()=>import('./add-eqtn/add-eqtn.module').then(m=>m.AddEqtnModule)
    }
];

@NgModule({
    declarations: [
        EqtnComponent,
        
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class EqtnModule {
}
