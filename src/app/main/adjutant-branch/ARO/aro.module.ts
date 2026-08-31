import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AroComponent } from './aro.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: AroComponent,

    },
    { path: 'add-aro', loadChildren: () => import('./add-aro/add-aro.module').then(m => m.AddAroModule) },
    { path: 'view-aro', loadChildren: () => import('./add-aro/add-aro.module').then(m => m.AddAroModule) },

];

@NgModule({
    declarations: [
        AroComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,

         MaterialModule
    ]
})

export class AroModule {
}
