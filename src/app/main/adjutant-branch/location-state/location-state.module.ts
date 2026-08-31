import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStateComponent } from './location-state.component';

import { MaterialModule } from '../../../material/material.module';


const routes = [
    {
        path: '',
        component: LocationStateComponent,

    },
    { path: 'add-locationstate', loadChildren: () => import('./add-location/add-location.module').then(m => m.AddLocationModule) },
    { path: 'view-locationstate', loadChildren: () => import('./add-location/add-location.module').then(m => m.AddLocationModule) },

];

@NgModule({
    declarations: [
        LocationStateComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class LocationStateModule {
}
