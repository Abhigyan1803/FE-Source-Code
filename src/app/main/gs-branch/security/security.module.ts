import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SECURITY_ROUTES } from './security.routes';

@NgModule({
    declarations: [ 
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(SECURITY_ROUTES),
    ]
})

export class SecurityModule { }