import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SUBJECTS_ROUTES } from './subjects.routes';
import {AcademicSubjectsComponent} from './academic-subjects.component'
import { MaterialModule } from 'app/material/material.module';
import { DeleteSubjectComponent } from './delete-subject/delete-subject.component';


export const SUBJECTS_ROUTES: Routes = [
  // Guard for Modules

  { path: '', component:AcademicSubjectsComponent },

  { path: 'add-subject', loadChildren: () => import('./add-subject/add-subject.module').then(m => m.AddSubjectModule) },
  { path: 'view-subject', loadChildren: () => import('./add-subject/add-subject.module').then(m => m.AddSubjectModule) },

  // { path: 'term-II-tech', loadChildren: () => imp  ort('./terms/term-II-tech/term-II-tech.module').then(m => m.Term_II_Tech_Module) },
  // { path: 'term-III', loadChildren: () => import('./terms/term-III/term-III.module').then(m => m.Term_III_Module) },
];
@NgModule({
    declarations: [
      AcademicSubjectsComponent,
      DeleteSubjectComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(SUBJECTS_ROUTES),
      MaterialModule
        
    ]
})

export class AcademicSubjectsModule { }
