import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { SortablejsModule} from "ngx-sortablejs";
import { Options } from 'sortablejs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { DragDropRoutes } from './drag-drop.routing';
import { DragulaDemoComponent } from './dragula/dragula.component';
import { SortableDemoComponent } from './sortablejs/sortable.component';

const sortablejsConfig: Options = {
	animation: 300
};

@NgModule({
	declarations: [
		DragulaDemoComponent,
		SortableDemoComponent
	],

	imports: [
		CommonModule,
		RouterModule.forChild(DragDropRoutes),
		DragulaModule.forRoot(),
		SortablejsModule,
		FlexLayoutModule,
		MatIconModule,
		MatCardModule,
		MatIconModule,
		MatListModule,
		MatCheckboxModule,
		MatToolbarModule,
    	TranslateModule
	]
})

export class DragDropModule { }
