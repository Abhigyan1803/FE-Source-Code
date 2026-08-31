import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DRILL_MARKS_ROUTES } from './drill-marks.routes';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
		RouterModule.forChild(DRILL_MARKS_ROUTES),

  ]
})
export class DrillModule { }
