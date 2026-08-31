import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdjutantOrderComponent } from './adjutant-order.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: AdjutantOrderComponent
    },
    { path: 'add-order', loadChildren: () => import('../add-order/add-order.module').then(m => m.AddOrderModule) },
    { path: 'view-order', loadChildren: () => import('../add-order/add-order.module').then(m => m.AddOrderModule) },
    
];

@NgModule({
    declarations: [
        AdjutantOrderComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        MaterialModule
     ]
})

export class AdjutantOrderModule {
}
