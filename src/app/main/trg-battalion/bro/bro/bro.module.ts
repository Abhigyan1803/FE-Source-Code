import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BroComponent } from './bro.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: BroComponent
    },
    {  path: 'add-bro', loadChildren: () => import('../add-bro/add-bro.module').then(m => m.AddBroModule) },
    {  path: 'view-bro', loadChildren: () => import('../add-bro/add-bro.module').then(m => m.AddBroModule) },


];

@NgModule({
    declarations: [
        BroComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule,
        

    ]
})

export class BroModule {
}
