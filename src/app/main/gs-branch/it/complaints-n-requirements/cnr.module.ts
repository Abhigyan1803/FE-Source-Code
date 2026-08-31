import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CNR_ROUTES } from './cnr.routes';
import { MaterialModule } from 'app/material/material.module';

@NgModule({
    declarations: [ 
  ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
      RouterModule.forChild(CNR_ROUTES),
    ]
})

export class CNRModule { }