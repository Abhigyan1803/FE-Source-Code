import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { INFO_SECURITY_ROUTES } from './info-security.routes';

@NgModule({
    declarations: [ 
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(INFO_SECURITY_ROUTES),
    ]
})

export class InfoSecurityModule { }