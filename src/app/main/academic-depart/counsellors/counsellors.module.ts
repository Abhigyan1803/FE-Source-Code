import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { COUNSELLORS_ROUTES } from './counsellors.routes';

@NgModule({
    declarations: [ 
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(COUNSELLORS_ROUTES),
    ]
})

export class CounsellorsModule { }