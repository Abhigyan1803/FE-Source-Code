import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CentralLibraryManagementComponent } from './central-library-management.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: CentralLibraryManagementComponent
    },
    { path: 'add-link', loadChildren: () => import('./add-link/add-link.module').then(m => m.AddLinkModule) },
    { path: 'view-link', loadChildren: () => import('./add-link/add-link.module').then(m => m.AddLinkModule) },

];

@NgModule({
    declarations: [
      CentralLibraryManagementComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class CentralLibraryManagementModule {
}
