import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ADJUTANT_ROUTES } from './adjutant-branch.routing';
import { AdjutantDialogModule } from './adjutant-dialog/adjutant-dialog.module';

@NgModule({
	declarations: [
	],

	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(ADJUTANT_ROUTES),
		AdjutantDialogModule,
	]
})

export class AdjutantModule { }
