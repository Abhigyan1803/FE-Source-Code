import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BdoComponent } from './bdo.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: BdoComponent
    },
    {  path: 'add-bdo', loadChildren: () => import('../add-bdo/add-bdo.module').then(m => m.AddBdoModule) },

    {  path: 'view-bdo', loadChildren: () => import('../add-bdo/add-bdo.module').then(m => m.AddBdoModule) },

];

@NgModule({
    declarations: [
        BdoComponent,
    ],
    imports: [

        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class BdoModule {
}
