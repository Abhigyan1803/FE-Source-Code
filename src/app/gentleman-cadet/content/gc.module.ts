import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { GC_ROUTES } from './gc.routes';
import { AcSubjectsComponent } from './ac-subjects/ac-subjects.component';
import { MaterialModule } from 'app/material/material.module';

import { CKEditorModule } from 'ckeditor4-angular';
import { GcDialogComponent } from './gc-dialog/gc-dialog.component';
// import { InterviewGcComponent } from './interview-gc/interview-gc.component';
// import { InterviewsComponent } from './interviews/interviews.component';

@NgModule({
    declarations: [
      AcSubjectsComponent,
      
      GcDialogComponent,
              // InterviewGcComponent,
     // InterviewsComponent,
  ],
    imports: [
        CommonModule, MaterialModule, CKEditorModule,
      RouterModule.forChild(GC_ROUTES),
    ]
})

export class GCModule { }
