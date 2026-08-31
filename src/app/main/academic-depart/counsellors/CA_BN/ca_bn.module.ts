import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CA_BN_ROUTES } from './ca_bn.routes';
import { CounsellorsNausheraComponent } from './counsellors-naushera/counsellors-naushera.component';
import { CounsellorsPoonachComponent } from './counsellors-poonach/counsellors-poonach.component';
import { AddCounsellorsPoonachComponent } from './counsellors-poonach/add-counsellors-poonach/add-counsellors-poonach.component';
import { CounsellorsHajipirComponent } from './counsellors-hajipir/counsellors-hajipir.component';

@NgModule({
    declarations: [ 
  
  
    
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      RouterModule.forChild(CA_BN_ROUTES),
    ]
})

export class CabnModule { }