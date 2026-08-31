import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerformanceComponent } from './performance.component';
// import { AddHistoryComponent } from './add-history/add-history.component';
import { MaterialModule } from 'app/material/material.module';
const routes = [
    {
        path: '',
        component: PerformanceComponent
    },
    { path: 'add-performance', loadChildren: () => import('./add-performance/add-performance.module').then(m => m.AddPerformanceModule) },
    { path: 'view-performance', loadChildren: () => import('./add-performance/add-performance.module').then(m => m.AddPerformanceModule) },
];

@NgModule({
    declarations: [
        PerformanceComponent,
     
    ],  
    imports: [

        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule

    ]
})

export class PerformanceModule {
}
