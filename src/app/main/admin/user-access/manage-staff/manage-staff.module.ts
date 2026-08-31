import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageStaffComponent } from './manage-staff.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: ManageStaffComponent
    },
    {
        path: 'add-staff',
        loadChildren: () => import('./add-staff/add-staff.module').then(m => m.AddStaffModule)
    },
    {
        path: 'view-staff',
        loadChildren: () => import('./add-staff/add-staff.module').then(m => m.AddStaffModule)
    }

];

@NgModule({
    declarations: [
        ManageStaffComponent,

    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class ManageStaffModule {
}
