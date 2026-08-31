import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CURRENT_CASES_ROUTES } from './current-cases.routes';
@NgModule({
    declarations: [ 
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(CURRENT_CASES_ROUTES),
    ]
})

export class CurrentCasesModule { }