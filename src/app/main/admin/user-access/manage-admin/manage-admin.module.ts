import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageAdminComponent } from './manage-admin.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MaterialModule} from 'app/material/material.module';

import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes = [
    {
        path: '',
        component: ManageAdminComponent
    },
    // {
    //     path: 'add-role',
    //     loadChildren: () => import('./add-role/add-role.module').then(m => m.AddRoleModule)
    // },
    // {
    //     path: 'view-role',
    //     loadChildren: () => import('./add-role/add-role.module').then(m => m.AddRoleModule)
    // }

];

@NgModule({
    declarations: [
        ManageAdminComponent,

    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class ManageAdminModule {
}
