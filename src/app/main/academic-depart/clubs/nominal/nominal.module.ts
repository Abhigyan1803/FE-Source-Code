import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NominalComponent } from './nominal.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: NominalComponent
    },
    {
        path:'add-nominal',
        loadChildren:()=>import('./add-nominal/add-nominal.module').then(m=>m.AddNominalModule)
    },
    {
        path:'view-nominal',
        loadChildren:()=>import('./add-nominal/add-nominal.module').then(m=>m.AddNominalModule)
    }
   
];

@NgModule({
    declarations: [
        NominalComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class NominalModule {
}
