import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermsComponent } from './terms.component';
import { MaterialModule } from 'app/material/material.module';


const routes = [
    {
        path: '',
        component: TermsComponent
    },
    {  path: 'add-syllabus', loadChildren: () => import('./add-syllabus/add-syllabus.module').then(m => m.AddSyllabusModule) },
    {  path: 'view-syllabus', loadChildren: () => import('./add-syllabus/add-syllabus.module').then(m => m.AddSyllabusModule) },
];

@NgModule({
    declarations: [
        TermsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule, MaterialModule
     ]
})

export class TermsModule {
}
