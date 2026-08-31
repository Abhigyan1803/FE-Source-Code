import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CalendarRoutes } from './calendar.routing';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';

@NgModule({
	declarations: [CalendarComponent],

	imports: [
		CommonModule,
		RouterModule.forChild(CalendarRoutes),
		CalendarModule.forRoot({
   		provide: DateAdapter,
   		useFactory: adapterFactory
    	}),
    	MatIconModule,
    	MatCardModule,
    	MatButtonModule,
		FormsModule,
		MaterialModule
	],
	entryComponents : [
		CalendarComponent

	]
})
export class Calendar_Module { }
