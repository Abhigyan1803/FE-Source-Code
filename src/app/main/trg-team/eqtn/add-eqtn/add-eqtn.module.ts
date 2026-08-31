import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {AddEqtnComponent} from './add-eqtn.component';
import { MatTable, MatTableModule } from '@angular/material/table';

const routes = [
    {
        path: '',
        component: AddEqtnComponent
    }
];

@NgModule({
    declarations: [
        AddEqtnComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule

    ]
})

export class AddEqtnModule {
}
