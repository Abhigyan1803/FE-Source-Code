import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
      import {MatCardModule} from '@angular/material/card';
      
import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import { AddMessageComponent } from './add-message.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

const routes = [
    {
        path: '',
        component: AddMessageComponent
    }
];

@NgModule({
    declarations: [
        AddMessageComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        
        MatCardModule, MatButtonModule, MatSnackBarModule,MatIconModule
        //  MatProgressBarModule, MatMenuModule, ChartsModule,/* NgxChartsModule */
        // MatIconModule, MatRadioModule, /* NgxChartsModule, */
        // MatButtonModule, MatDividerModule, MatChipsModule, MatListModule, 
        // SharedPipesModule,
        // MatFormFieldModule, FlexLayoutModule,
        // MatInputModule, MatTabsModule,
        // MatRippleModule, MatSelectModule, MatTableModule, MatTooltipModule, MatPaginatorModule, MatDatepickerModule
    ]
})

export class AddMessagesModule {
}
