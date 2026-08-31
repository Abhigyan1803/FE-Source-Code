import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecommenedBookComponent } from './recommened-book.component';
import { MaterialModule } from 'app/material/material.module';



const routes = [
    {
        path: '',
        component: RecommenedBookComponent
    },

    { path: 'add-book-list', loadChildren: () => import('./add-recommended-book/add-recommended-book.module').then(m => m.AddRecommendedBookModule) },
    { path: 'view-book-list', loadChildren: () => import('./add-recommended-book/add-recommended-book.module').then(m => m.AddRecommendedBookModule) },

];

@NgModule({
    declarations: [
        RecommenedBookComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class RecommenedBookModule {
}
