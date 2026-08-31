import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParadeStateComponent } from './parade-state.component';

import { MaterialModule } from '../../../material/material.module';


const routes = [
    {
        path: '',
        component: ParadeStateComponent,

    },
    { path: 'add-paradestate', loadChildren: () => import('./add-parade/add-parade.module').then(m => m.AddParadeModule) },
    { path: 'view-paradestate', loadChildren: () => import('./add-parade/add-parade.module').then(m => m.AddParadeModule) },

];

@NgModule({
    declarations: [
        ParadeStateComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,

         MaterialModule
    ]
})

export class ParadeStateModule {
}
