import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GsoTwoTrainingComponent } from './gso-two-training.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes = [
    {
        path: '',
        component: GsoTwoTrainingComponent
    }
];

@NgModule({
    declarations: [
        GsoTwoTrainingComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MatCardModule,MatButtonModule,MatIconModule,MatPaginatorModule
        // MatCardModule, MatProgressBarModule, MatMenuModule, ChartsModule,/* NgxChartsModule */
        // MatIconModule, MatRadioModule, /* NgxChartsModule, */
        // MatButtonModule, MatDividerModule, MatChipsModule, MatListModule, 
        // SharedPipesModule,
        // MatFormFieldModule, FlexLayoutModule,
        // MatInputModule, MatTabsModule,
        // MatRippleModule, MatSelectModule, MatTableModule, MatTooltipModule, MatPaginatorModule, MatDatepickerModule
    ]
})

export class GsoTwoTrainingModule {
}
