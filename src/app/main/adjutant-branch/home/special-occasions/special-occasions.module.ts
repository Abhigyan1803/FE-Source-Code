import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialOccasionsComponent } from './special-occasions.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: SpecialOccasionsComponent
    },
    { path: 'view', loadChildren: () => import('./add-occasion/add-occasion.module').then(m => m.AddOccasionModule) },
    { path: 'add', loadChildren: () => import('./add-occasion/add-occasion.module').then(m => m.AddOccasionModule)},
    
];

@NgModule({
    declarations: [
        SpecialOccasionsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class SpecialOccasionsModule {
}
