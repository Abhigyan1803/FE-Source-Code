import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceptionGcComponent } from './reception-gc.component';
import { MaterialModule } from 'app/material/material.module';
import { AddReceptionComponent } from './add-reception/add-reception.component';


const routes = [
    {
        path: '',
        component: ReceptionGcComponent
    },
    {
        path:'add-reception',
        loadChildren:()=>import('../reception-gc/add-reception/add-reception.module').then(m=>m.AddReceptionModule)
    },
    {
        path:'view-reception',
        loadChildren:()=>import('../reception-gc/add-reception/add-reception.module').then(m=>m.AddReceptionModule)
    }
];

@NgModule({
    declarations: [
        ReceptionGcComponent,
        
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class ReceptionGcModule {
}
