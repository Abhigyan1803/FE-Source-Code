import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { NgxEasypiechartModule } from 'ngx-easypiechart';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { ChartComponent } from './ng2-charts/chart.component';
import { EasyPieChartComponent } from './easy-pie-chart/easy-pie-chart.component';
import { ChartRoutes } from './chart.routing';
import { WidgetComponentModule } from '../widget-component/widget-component.module';


@NgModule({
	declarations: [EasyPieChartComponent, ChartComponent],
	imports: [
		CommonModule,
		ChartsModule,
		NgxEasypiechartModule,
		WidgetComponentModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		MatMenuModule,
		FlexLayoutModule,
    	TranslateModule,
    	RouterModule.forChild(ChartRoutes)
	]
})
export class ChartModule { }
