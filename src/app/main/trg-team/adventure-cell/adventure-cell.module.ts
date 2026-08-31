import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AdventureCellRoutes } from './adventure-cell.routing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatPaginatorModule,
		PerfectScrollbarModule,
		MatProgressBarModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(AdventureCellRoutes)
	],
	schemas: [NO_ERRORS_SCHEMA]
})

export class AdventureCellModule { }
