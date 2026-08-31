import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material/material.module';
import { OBSN_SHEET_ROUTES } from './Obsn-sheet.routes';
import { ObsnComponent } from './obsn/obsn.component';


@NgModule({
    declarations: [  
  ],
    imports: [
        CommonModule, MaterialModule,
      RouterModule.forChild(OBSN_SHEET_ROUTES),
    ]
})

export class ObsnsheetModule { }
