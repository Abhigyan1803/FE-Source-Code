import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material/material.module';
import { OTHERDETAILS_ROUTES} from './otherdetails.routes';


@NgModule({
    declarations: [  
  ],
    imports: [
        CommonModule, MaterialModule,
      RouterModule.forChild(OTHERDETAILS_ROUTES),
    ]
})

export class OtherdetailsModule { }