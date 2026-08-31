import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SoldierlyComponent } from './soldierly.component';
import { MaterialModule } from 'app/material/material.module';



const routes = [
    {
        path: '',
        component: SoldierlyComponent
    },
    {  path: 'add-syllabus', loadChildren: () => import('./add-syllabus/add-syllabus.module').then(m => m.AddSyllabusModule) },
    {  path: 'view-syllabus', loadChildren: () => import('./add-syllabus/add-syllabus.module').then(m => m.AddSyllabusModule) },
    
    
];

@NgModule({
    declarations: [
        SoldierlyComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule, MaterialModule
     ]
})

export class SoldierlyModule {
}
