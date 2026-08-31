import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OQ_DRILL_ROUTES } from './oq-drill.routing';
import { MidTermComponent } from './mid-term/mid-term.component';
import { FinalTermComponent } from './final-term/final-term.component';
// import { KhalihathComponent } from './khalihath/khalihath.component';


@NgModule({
	declarations: [  
  
    
  
    
  ],
	
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(OQ_DRILL_ROUTES),
	]
})

export class OqdrillModule { }
