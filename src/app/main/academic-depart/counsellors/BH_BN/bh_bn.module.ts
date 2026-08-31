import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BH_BN_ROUTES } from './bh_bn.routes';

@NgModule({
    declarations: [ 
    
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(BH_BN_ROUTES),
    ]
})

export class BhbnModule { }