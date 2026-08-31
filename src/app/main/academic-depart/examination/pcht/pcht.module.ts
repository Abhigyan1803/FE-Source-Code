import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PchtComponent } from './pcht.component';
import { MaterialModule } from 'app/material/material.module';



const routes = [
    {
        path: '',
        component: PchtComponent
    },
    {
        path:'add-pcht',
        loadChildren:()=>import('./add-pcht/add-pcht.module').then(m=>m.AddPchtModule)
    },
    {
        path:'view-pcht',
        loadChildren:()=>import('./add-pcht/add-pcht.module').then(m=>m.AddPchtModule)
    }
];

@NgModule({
    declarations: [
        PchtComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class PchtModule {
}
