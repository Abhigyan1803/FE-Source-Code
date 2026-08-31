import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImaBlogsComponent } from './ima-blogs.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: ImaBlogsComponent
    },
    { path: 'add-blog', loadChildren: () => import('./add-blog/add-blog.module').then(m => m.AddBlogModule) },
    { path: 'view-blog', loadChildren: () => import('./add-blog/add-blog.module').then(m => m.AddBlogModule) },

];

@NgModule({
    declarations: [
        ImaBlogsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class IMABlogsModule {
}
