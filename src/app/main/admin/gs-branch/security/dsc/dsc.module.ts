import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DscComponent } from './dsc.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: DscComponent
    },
    {
        path:'add-dsc',
        loadChildren:()=>import('../dsc/add-dsc/add-dsc.module').then(m=>m.AddDscModule)
    },
    {
        path:'view-dsc',
        loadChildren:()=>import('../dsc/add-dsc/add-dsc.module').then(m=>m.AddDscModule)
    }
];

@NgModule({
    declarations: [
        DscComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class DscModule {
}
