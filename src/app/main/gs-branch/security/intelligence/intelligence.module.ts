import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { INTELLIGENCE_ROUTES } from './intelligence.routes';

@NgModule({
    declarations: [ 
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(INTELLIGENCE_ROUTES),
    ]
})

export class IntelligenceModule { }