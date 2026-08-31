import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PAPER6_ROUTES } from './paper6.routes';

@NgModule({
    declarations: [
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(PAPER6_ROUTES),
        
    ]
})

export class Paper6Module { }
