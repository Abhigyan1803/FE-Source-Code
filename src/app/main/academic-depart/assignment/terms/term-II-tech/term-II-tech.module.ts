import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TERM_II_TECH_ROUTES } from './term-II-tech.routes';


@NgModule({
    declarations: [
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(TERM_II_TECH_ROUTES),
        
    ]
})

export class Term_II_Tech_Module { }
