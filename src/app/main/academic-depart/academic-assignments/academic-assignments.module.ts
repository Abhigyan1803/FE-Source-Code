import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SUBJECTS_ROUTES } from './subjects.routes';
import {AcademicAssignmentsComponent} from './academic-assignments.component';
import { MaterialModule } from 'app/material/material.module';
import { CKEditorModule } from 'ckeditor4-angular';



export const SUBJECTS_ROUTES: Routes = [
  // Guard for Modules

  { path: '', component:AcademicAssignmentsComponent },

  { path: 'add-assignment', loadChildren: () => import('./add-academic-assignments/add-academic-assignments.module').then(m => m.AddAcademicAssignmentsModule) },
  // { path: 'term-II-tech', loadChildren: () => imp  ort('./terms/term-II-tech/term-II-tech.module').then(m => m.Term_II_Tech_Module) },
  // { path: 'term-III', loadChildren: () => import('./terms/term-III/term-III.module').then(m => m.Term_III_Module) },
];
@NgModule({
    declarations: [
      AcademicAssignmentsComponent,
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(SUBJECTS_ROUTES),
      MaterialModule, CKEditorModule
        
    ]
})

export class AcademicAssignmentsModule { }
