import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEbookComponent } from './add-ebook/add-ebook.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes:Routes= [
  {
      path: '',
      component: AddEbookComponent
  }

];

@NgModule({
  declarations: [
    AddEbookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    MaterialModule
  ]
})
export class AddEbookModule { }
