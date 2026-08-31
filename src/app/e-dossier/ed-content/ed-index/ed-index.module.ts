import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material/material.module';
import { ED_INDEX_ROUTES } from './ed-index.routing';
import { ClubComponent } from './otherdetails/club/club.component';
import { HikeComponent } from './otherdetails/hike/hike.component';
import { LveComponent } from './otherdetails/lve/lve.component';

import { EdCounsellingComponent } from './ed-counselling/ed-counselling.component';
// import { InterviewSheetComponent } from './interviews/interview-sheet/interview-sheet.component';

@NgModule({
    declarations: [
 
  
    // ClubComponent,
    //       HikeComponent,
    //       LveComponent,
    //       CounsellingComponent,
          // InterviewSheetComponent
    ],
    imports: [
        CommonModule, MaterialModule,
      RouterModule.forChild(ED_INDEX_ROUTES),
    ]
})

export class EDINDEXModule { }
