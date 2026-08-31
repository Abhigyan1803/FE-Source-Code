import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { GcActivitiesComponent } from './gc-activities.component';
import { MaterialModule } from 'app/material/material.module';
const routes = [
    {
        path: '',
        component: GcActivitiesComponent
    },
    { path: 'add-activities', loadChildren: () => import('./add-gc-activities/add-gc-activities.module').then(m => m.AddHistoryModule) },
    { path: 'view-activities', loadChildren: () => import('./add-gc-activities/add-gc-activities.module').then(m => m.AddHistoryModule) },
];

@NgModule({
    declarations: [
        GcActivitiesComponent,
     
    ],  
    imports: [

        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule,MatGridListModule

    ]
})

export class  GcActivitiesModule {
}
