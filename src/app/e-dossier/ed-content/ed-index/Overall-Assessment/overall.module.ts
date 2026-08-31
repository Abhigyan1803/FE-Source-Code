import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material/material.module';
import { ED_OVERALL_ROUTES } from './overall.routing';
import { InteractualComponent } from './interactual/interactual.component';
import { DrillComponent } from './drill/drill.component';
import { ServiceSubjectComponent } from './service-subject/service-subject.component';
import { AssessmentOqComponent } from './assessment-oq/assessment-oq.component';

@NgModule({
    declarations: [  
    // InteractualComponent, DrillComponent
  
    //AssessmentOqComponent
  ],
    imports: [
        CommonModule, MaterialModule,
      RouterModule.forChild(ED_OVERALL_ROUTES),
    ]
})

export class OVERALLModule { }
