import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBlogComponent } from './add-blog.component';
import { MaterialModule } from 'app/material/material.module';
import { CKEditorModule } from 'ckeditor4-angular';

const routes = [
    {
        path: '',
        component: AddBlogComponent
    },
];

@NgModule({
    declarations: [
        AddBlogComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule, CKEditorModule
    ]
        
})

export class AddBlogModule {
}
