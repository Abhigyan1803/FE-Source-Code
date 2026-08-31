import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddAcademicAssignmentsComponent  } from './add-academic-assignments.component';
import { CKEditorModule } from 'ckeditor4-angular';
const routes = [
    {
        path: '',
        component: AddAcademicAssignmentsComponent
    }
];

@NgModule({
    declarations: [
        AddAcademicAssignmentsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        CKEditorModule
    ]
})

export class AddAcademicAssignmentsModule {
}

