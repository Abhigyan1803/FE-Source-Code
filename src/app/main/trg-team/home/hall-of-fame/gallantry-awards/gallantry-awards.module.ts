import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { GallantryAwardsComponent } from './gallantry-awards.component';

const routes = [
    {
        path: '',
        component: GallantryAwardsComponent
    },

    { path: 'add-gallantry-awardee', loadChildren: () => import('./add-awardee/add-awardee.module').then(m => m.AddAwardeeModule) },
    { path: 'view-gallantry-awardee', loadChildren: () => import('./add-awardee/add-awardee.module').then(m => m.AddAwardeeModule) },

];

@NgModule({
    declarations: [
        GallantryAwardsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class GallantryAwardsModule {
}
