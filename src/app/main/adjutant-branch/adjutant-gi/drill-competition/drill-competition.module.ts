import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DRILL_COMPETITION_ROUTES } from './drill-competition.routing';
// import { KhalihathComponent } from './khalihath/khalihath.component';


@NgModule({
	declarations: [  
  ],
	
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(DRILL_COMPETITION_ROUTES),
	]
})

export class DrillCompetitionModule { }
