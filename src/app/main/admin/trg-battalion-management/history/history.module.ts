import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history.component';
import { AddHistoryComponent } from './add-history/add-history.component';
import { MaterialModule } from 'app/material/material.module';
const routes = [
    {
        path: '',
        component: HistoryComponent
    },
    { path: 'add-history', loadChildren: () => import('./add-history/add-history.module').then(m => m.AddHistoryModule) },
    { path: 'view-history', loadChildren: () => import('./add-history/add-history.module').then(m => m.AddHistoryModule) },
];

@NgModule({
    declarations: [
        HistoryComponent,
     
    ],  
    imports: [

        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule

    ]
})

export class HistoryModule {
}
