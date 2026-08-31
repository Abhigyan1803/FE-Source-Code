import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EDCAMPMARKS_ROUTES } from './ed-campmark.routes';


@NgModule({
  declarations: [


  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(EDCAMPMARKS_ROUTES),

  ]
})

export class EDCampMarksModule { }
