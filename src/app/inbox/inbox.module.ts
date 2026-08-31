import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { InboxComponent } from './inbox/inbox.component';

import { inboxRoutes } from './inbox.routing';
import { MailService } from '../service/mail/mail.service';

@NgModule({
	declarations: [InboxComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(inboxRoutes),
		MatSidenavModule,
		MatIconModule,
		MatButtonModule,
		MatMenuModule,
		MatCardModule,
		MatToolbarModule,
		MatDividerModule,
		MatListModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		FormsModule,
		MatSelectModule,
		MatOptionModule,
		MatDialogModule,
		FlexLayoutModule,
		MatPaginatorModule
	],
	providers: [
		MailService
	]
})
export class InboxModule { }
