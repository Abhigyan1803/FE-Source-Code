import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material/material.module';
import { INTERVIEWS_ROUTES } from './interviews.routes';




@NgModule({
    declarations: [  
    
  
  
  ],
    imports: [
        CommonModule, MaterialModule,
      RouterModule.forChild(INTERVIEWS_ROUTES),
    ]
})

export class InterviewsModule { }
