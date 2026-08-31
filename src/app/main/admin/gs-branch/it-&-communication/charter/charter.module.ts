import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CHARTER_ROUTES } from './charter.routes';

@NgModule({
    declarations: [ 
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(CHARTER_ROUTES),
    ]
})

export class CharterModule { }