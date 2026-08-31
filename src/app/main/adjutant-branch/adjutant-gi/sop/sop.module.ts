import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SopComponent } from './sop.component';
import { MaterialModule } from 'app/material/material.module';
// import { AddSopComponent } from './add-sop/add-sop.component';


const routes = [
    {
        path: '',
        component: SopComponent
    },
    {
        path:'add-sop',
        loadChildren:()=>import('../sop/add-sop/add-sop.module').then(m=>m.AddSopModule)
    },
    {
        path:'view-sop',
        loadChildren:()=>import('../sop/add-sop/add-sop.module').then(m=>m.AddSopModule)
    }
];

@NgModule({
    declarations: [
        SopComponent,
      
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class SopModule {
}
