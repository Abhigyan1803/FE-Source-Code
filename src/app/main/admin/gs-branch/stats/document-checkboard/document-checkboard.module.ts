import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DOCUMENT_CHECKBOARD_ROUTES } from './document-checkboard.routes';

@NgModule({
    declarations: [ 
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(DOCUMENT_CHECKBOARD_ROUTES),
    ]
})

export class DocumentCheckboardModule { }