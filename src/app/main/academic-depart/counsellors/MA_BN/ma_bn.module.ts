import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MA_BN_ROUTES } from './ma_bn.routes';
import { CounsellorsImphalComponent } from './counsellors-imphal/counsellors-imphal.component';
import { CounsellorsJessoreComponent } from './counsellors-jessore/counsellors-jessore.component';
import { CounsellorsSangroComponent } from './counsellors-sangro/counsellors-sangro.component';


@NgModule({
    declarations: [ 
    
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(MA_BN_ROUTES),
        
    ]
})

export class MabnModule { }