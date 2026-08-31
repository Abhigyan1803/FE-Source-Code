import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ADJUTANT_GENERAL_INSTRUCTION_ROUTES } from './adjutant-gi.routing';


@NgModule({
	declarations: [

	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(ADJUTANT_GENERAL_INSTRUCTION_ROUTES),
	]
})

export class AdjutantGeneralInstructionModule { }


// import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatListModule } from '@angular/material/list';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';
// import { MatTabsModule } from '@angular/material/tabs';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { RouterModule } from '@angular/router';
// import { ChartsModule } from 'ng2-charts';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { AgmCoreModule } from '@agm/core';
// import { NgxEasypiechartModule } from 'ngx-easypiechart';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { GENERAL_ALL_ROUTES} from './general-Instruction.routing'

// import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { SheduleComponent } from './shedule/shedule.component';
// import { AddScheduleComponent } from './shedule/add-schedule/add-schedule.component';
// import { DrillMarksComponent } from './drill-marks/drill-marks.component';
// import { AddDrillMarksComponent } from './drill-marks/add-drill-marks/add-drill-marks.component';
// // import { AddOrderComponent } from './add-order/add-order.component';



// @NgModule({
// 	declarations: [

//   ],
// 	imports: [
// 		CommonModule,
// 		MatTableModule,
// 		MatSelectModule,
// 		FlexLayoutModule,
// 		// WidgetComponentModule,
// 		NgxEasypiechartModule,
// 		MatPaginatorModule,
// 		MatChipsModule,
//       TranslateModule,
//       PerfectScrollbarModule,
// 		MatIconModule,
// 		MatButtonModule,
// 		MatTabsModule,
// 		MatCardModule,
// 		MatMenuModule,
// 		MatListModule,
// 		MatCheckboxModule,
// 		MatDividerModule,
// 		ChartsModule,
// 		NgxDatatableModule,
// 		MatProgressBarModule,
// 		MatInputModule,
// 		MatFormFieldModule,
// 		FormsModule,
// 		ReactiveFormsModule, 
// 		MatSortModule,
// 		RouterModule.forChild(GENERAL_ALL_ROUTES)
// 		// AgmCoreModule.forRoot({apiKey: 'AIzaSyD4y2luRxfM8Q8yKHSLdOOdNpkiilVhD9k'})
// 	],
// 	schemas: [ NO_ERRORS_SCHEMA]
// })

// export class GeneralALLModule { }
