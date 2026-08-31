import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TH_BN_ROUTES } from './th_bn.routes';
import { CounsellorsChushulComponent } from './counsellors-chushul/counsellors-chushul.component';


@NgModule({
    declarations: [ 
  
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(TH_BN_ROUTES),
    ]
})

export class ThbnModule { }