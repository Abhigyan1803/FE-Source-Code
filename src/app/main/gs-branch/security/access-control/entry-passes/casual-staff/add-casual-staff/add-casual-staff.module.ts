import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddCasualStaffComponent } from './add-casual-staff.component';

const routes = [
    {
        path: '',
        component: AddCasualStaffComponent
    }
];

@NgModule({
    declarations: [
        AddCasualStaffComponent,
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

export class AddCasualStaffModule {
}

