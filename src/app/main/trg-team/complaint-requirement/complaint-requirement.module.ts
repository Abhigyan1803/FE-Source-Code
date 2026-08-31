import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintRequirementComponent } from './complaint-requirement.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MaterialModule} from 'app/material/material.module';
import { AddComplaintsComponent } from './add-complaints/add-complaints.component';
import {complaintrequirementRoutes} from './complaint-requirement.routes'
// const routes = [
//     {
//         path: '',
//         component: ComplaintRequirementComponent
//     },
//     {
//         path:'add-complaints',
//         loadChildren:()=>import('../complaint-requirement/add-complaints/add-complaints.module').then(m=>m.AddComplaintsModule)
//     },
//     {
//         path:'view-complaints',
//         loadChildren:()=>import('../complaint-requirement/add-complaints/add-complaints.module').then(m=>m.AddComplaintsModule)
//     }
// ];

@NgModule({
    declarations: [
        ComplaintRequirementComponent,
        
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule, ReactiveFormsModule,
        MatCardModule,MatButtonModule,MatIconModule,MatPaginatorModule,
        RouterModule.forChild(complaintrequirementRoutes),
    ]
})

export class ComplaintRequirementModule {
}
