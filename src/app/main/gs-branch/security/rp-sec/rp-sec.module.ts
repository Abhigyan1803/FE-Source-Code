import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { RpSecComponent } from './rp-sec.component';
import { AddRpSecComponent } from './add-rp-sec/add-rp-sec.component';


const routes = [
    {
        path: '',
        component: RpSecComponent
    },
    {
        path:'add-rp',
        loadChildren:()=>import('../rp-sec/add-rp-sec/add-rp-sec.module').then(m=>m.AddRpSecModule)
    },
    {
        path:'view-rp',
        loadChildren:()=>import('../rp-sec/add-rp-sec/add-rp-sec.module').then(m=>m.AddRpSecModule)
    }
];

@NgModule({
    declarations: [
        RpSecComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class RpSecModule {
}
