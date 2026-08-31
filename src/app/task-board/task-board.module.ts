import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule} from'@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskBoardRoutes } from './task-board.routing';

@NgModule({
	declarations: [TaskBoardComponent],
	imports: [
		CommonModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		FlexLayoutModule,
		TranslateModule,
		DragulaModule.forRoot(),
		RouterModule.forChild(TaskBoardRoutes)
	]
})

export class TaskBoardModule { }
