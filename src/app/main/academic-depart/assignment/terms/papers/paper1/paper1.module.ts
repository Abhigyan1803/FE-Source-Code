import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PAPER1_ROUTES } from './paper1.routes';

@NgModule({
    declarations: [
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(PAPER1_ROUTES),
        
    ]
})

export class Paper1Module { }
