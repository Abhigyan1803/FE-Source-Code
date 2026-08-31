import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chatRoutes } from './chat.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule} from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { ChatComponent } from './chat/chat.component';

@NgModule({
	declarations: [ChatComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(chatRoutes),
		MatIconModule,
		MatButtonModule,
		MatMenuModule,
		MatCardModule,
		MatToolbarModule,
		MatDividerModule,
		MatSidenavModule,
		MatListModule,
		MatFormFieldModule,
		FormsModule,
		PerfectScrollbarModule,
		MatInputModule,
		FlexLayoutModule,
    	TranslateModule
	]
})
export class ChatModule { }
