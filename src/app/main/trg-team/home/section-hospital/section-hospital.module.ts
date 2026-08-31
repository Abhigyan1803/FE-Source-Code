import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectionHospitalComponent } from './section-hospital.component';
import { MaterialModule } from 'app/material/material.module';



const routes = [
    {
        path: '',
        component: SectionHospitalComponent
    },

    { path: 'add-sec-hospital', loadChildren: () => import('./add-sec-hospital/add-sec-hospital.module').then(m => m.AddSecHospitalModule) },
    { path: 'view-sec-hospital', loadChildren: () => import('./add-sec-hospital/add-sec-hospital.module').then(m => m.AddSecHospitalModule) },

];

@NgModule({
    declarations: [
        SectionHospitalComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
    ]
})

export class SectionHospitalModule {
}
