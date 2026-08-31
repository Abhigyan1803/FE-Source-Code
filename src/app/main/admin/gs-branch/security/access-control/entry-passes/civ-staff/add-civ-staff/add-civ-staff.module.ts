import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddCivStaffComponent } from './add-civ-staff.component';

const routes = [
    {
        path: '',
        component: AddCivStaffComponent
    }
];

@NgModule({
    declarations: [
        AddCivStaffComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule

    ]
})

export class AddCivStaffModule {
}

