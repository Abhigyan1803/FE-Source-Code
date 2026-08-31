import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GUIDELINES_ROUTES } from './guidelines.routes';


@NgModule({
    declarations: [ 
  
    
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(GUIDELINES_ROUTES),
    ]
})

export class GuidelinesModule { }