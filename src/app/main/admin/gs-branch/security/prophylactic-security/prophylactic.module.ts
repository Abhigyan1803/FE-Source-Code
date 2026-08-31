import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PROPHYLACTIC_SECURITY_ROUTES } from './prophylactic.routes';
import { AddProphylacticPoliciesComponent } from './prophylactic-policies/add-prophylactic-policies/add-prophylactic-policies.component';

@NgModule({
    declarations: [ 
  
  
    
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(PROPHYLACTIC_SECURITY_ROUTES),
    ]
})

export class ProphylacticModule { }