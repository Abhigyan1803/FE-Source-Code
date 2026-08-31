import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AssignmentOfDutiesComponent} from './assignment-of-duties.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: AssignmentOfDutiesComponent
    },
    {
        path:'add-aod',
        loadChildren:()=>import('../add-assignment-of-duties/add-assignment-of-duties.module').then(m=>m.AddAssignmentOfDutiesModule)
    },
    {
        path:'view-aod',
        loadChildren:()=>import('../add-assignment-of-duties/add-assignment-of-duties.module').then(m=>m.AddAssignmentOfDutiesModule)
    }
];

@NgModule({
    declarations: [
        AssignmentOfDutiesComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class AssignmentOfDutiesModule {
}
