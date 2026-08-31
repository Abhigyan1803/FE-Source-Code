import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PAPER2_ROUTES } from './paper2.routes';

@NgModule({
    declarations: [],

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(PAPER2_ROUTES),
        
    ]
})

export class Paper2Module { }
