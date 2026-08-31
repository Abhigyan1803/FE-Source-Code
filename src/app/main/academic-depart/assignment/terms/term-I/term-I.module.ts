import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TERM_I_ROUTES } from './term-I.routes';


@NgModule({
    declarations: [
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(TERM_I_ROUTES),
        
    ]
})

export class Term_I_Module { }
