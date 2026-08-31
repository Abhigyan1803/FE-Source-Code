import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GcAssessmentComponent } from './gc-assessment.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes = [
  {
      path: '',
      component:GcAssessmentComponent  
  },
  // { path: 'club', loadChildren: () => import('./').then(m => m.) }
  

];

@NgModule({
  declarations: [
    GcAssessmentComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,MaterialModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class GcAssessmentModule { }
