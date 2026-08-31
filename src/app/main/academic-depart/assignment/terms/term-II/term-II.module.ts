import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TERM_II_ROUTES } from './term-II.routes';


@NgModule({
    declarations: [
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(TERM_II_ROUTES),
        
    ]
})

export class Term_II_Module { }
