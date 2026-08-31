import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DRILL_COMP_ROUTES } from './drill-comp.routes';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
		RouterModule.forChild(DRILL_COMP_ROUTES),

  ]
})
export class DrillCompModule { }
