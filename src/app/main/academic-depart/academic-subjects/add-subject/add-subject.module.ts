import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SUBJECTS_ROUTES } from './subjects.routes';
import {AddSubjectComponent} from './add-subject.component'
import { MaterialModule } from 'app/material/material.module';
import { CKEditorModule } from 'ckeditor4-angular';



export const SUBJECTS_ROUTES: Routes = [
  // Guard for Modules

  { path: '', component:AddSubjectComponent },

  // { path: 'add-subject', loadChildren: () => import('./terms/term-II/term-II.module').then(m => m.Term_II_Module) },
  // { path: 'term-II-tech', loadChildren: () => import('./terms/term-II-tech/term-II-tech.module').then(m => m.Term_II_Tech_Module) },
  // { path: 'term-III', loadChildren: () => import('./terms/term-III/term-III.module').then(m => m.Term_III_Module) },

];
@NgModule({
    declarations: [
      AddSubjectComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(SUBJECTS_ROUTES),
      MaterialModule, CKEditorModule
        
    ]
})

export class AddSubjectModule { }
