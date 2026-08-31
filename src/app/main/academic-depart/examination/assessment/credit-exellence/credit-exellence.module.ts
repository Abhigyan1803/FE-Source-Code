import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditExellenceComponent } from './credit-exellence.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: CreditExellenceComponent
    },
    {
        path:'add-credit',
        loadChildren:()=>import('./add-credit-exellence/add-credit-exellence.module').then(m=>m.AddCreditExellenceModule)
    },
    {
        path:'view-credit',
        loadChildren:()=>import('./add-credit-exellence/add-credit-exellence.module').then(m=>m.AddCreditExellenceModule)
    }
   
];

@NgModule({
    declarations: [
        CreditExellenceComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class CreditExellenceModule {
}
