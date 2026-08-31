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
import { complaintrequirementRoutes } from './complaint-requirement.routes';

// const routes = [
//     // {
//     //     path: '',
//     //     component: ComplaintRequirementComponent
//     // },
//     {
//         path:'add-complaints',
//         loadChildren:()=>import('../complaint-requirement/add-complaints/add-complaints.module').then(m=>m.AddComplaintsModule)
//     },
//     {
//         path:'view-complaints',
//         loadChildren:()=>import('../complaint-requirement/add-complaints/add-complaints.module').then(m=>m.AddComplaintsModule)
//     },
//     {  path: 'mes', loadChildren: () => import('./mes/mes.module').then(m => m.MesModule) },
//     {  path: 'personal-kit-items', loadChildren: () => import('./personalkit/personalkit.module').then(m => m.PersonalkitModule) },
// ];

@NgModule({
    declarations: [
        ComplaintRequirementComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(complaintrequirementRoutes),
        MaterialModule,
        FormsModule, ReactiveFormsModule,
        MatCardModule,MatButtonModule,MatIconModule,MatPaginatorModule
        
    ]
})

export class ComplaintRequirementModule {
}
