import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GallantryComponent } from './gallantry.component';

import { MaterialModule } from 'app/material/material.module';
const routes = [
    {
        path: '',
        component: GallantryComponent
    },
    { path: 'add-gallantry', loadChildren: () => import('./add-gallantry/add-gallantry.module').then(m => m.AddGallantryModule) },
    { path: 'view-gallantry', loadChildren: () => import('./add-gallantry/add-gallantry.module').then(m => m.AddGallantryModule) },
];

@NgModule({
    declarations: [
        GallantryComponent
     
    ],  
    imports: [

        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule

    ]
})

export class GallantryModule {
}
