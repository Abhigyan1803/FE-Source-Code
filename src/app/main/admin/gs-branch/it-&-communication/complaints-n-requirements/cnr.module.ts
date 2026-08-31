import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CNR_ROUTES } from './cnr.routes';

@NgModule({
    declarations: [ 
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(CNR_ROUTES),
    ]
})

export class CNRModule { }