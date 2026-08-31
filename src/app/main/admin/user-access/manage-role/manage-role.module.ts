import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageRoleComponent } from './manage-role.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: ManageRoleComponent
    },
    {
        path: 'add-role',
        loadChildren: () => import('./add-role/add-role.module').then(m => m.AddRoleModule)
    },
    {
        path: 'view-role',
        loadChildren: () => import('./add-role/add-role.module').then(m => m.AddRoleModule)
    }

];

@NgModule({
    declarations: [
        ManageRoleComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MaterialModule
    ]
})

export class ManageRoleModule {
}
