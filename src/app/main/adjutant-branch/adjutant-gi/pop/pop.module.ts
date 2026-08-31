import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopComponent } from './pop.component';
import { MaterialModule } from 'app/material/material.module';
import { AddPopComponent } from './add-pop/add-pop.component';


const routes = [
    {
        path: '',
        component: PopComponent
    },
    {
        path:'add-pop',
        loadChildren:()=>import('../pop/add-pop/add-pop.module').then(m=>m.AddPopModule)
    },
    {
        path:'view-pop',
        loadChildren:()=>import('../pop/add-pop/add-pop.module').then(m=>m.AddPopModule)
    }
];

@NgModule({
    declarations: [
        PopComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class PopModule {
}
