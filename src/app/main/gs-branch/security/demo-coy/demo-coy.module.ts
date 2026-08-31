import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoCoyComponent } from './demo-coy.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: DemoCoyComponent
    },
    {
        path:'add-demo',
        loadChildren:()=>import('../demo-coy/add-demo-coy/add-demo-coy.module').then(m=>m.AddDemoCoyModule)
    },
    {
        path:'view-demo',
        loadChildren:()=>import('../demo-coy/add-demo-coy/add-demo-coy.module').then(m=>m.AddDemoCoyModule)
    }
];

@NgModule({
    declarations: [
        DemoCoyComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class DemoCoyModule {
}
