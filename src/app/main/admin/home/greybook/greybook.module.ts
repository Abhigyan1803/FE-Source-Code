import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GreybookComponent } from './greybook.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: GreybookComponent
    },
    { path: 'view-greybook', loadChildren: () => import('./add-greybook/add-greybook.module').then(m => m.AddGreybookModule) },
    { path: 'add-greybook', loadChildren: () => import('./add-greybook/add-greybook.module').then(m => m.AddGreybookModule) },
    
];

@NgModule({
    declarations: [
        GreybookComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
        
})

export class GreybookModule {
}
