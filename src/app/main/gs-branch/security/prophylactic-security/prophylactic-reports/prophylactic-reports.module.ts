
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProphylacticReportsComponent } from './prophylactic-reports.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddProphylacticReportComponent } from './add-prophylactic-report/add-prophylactic-report.component';

const routes = [
    {
        path: '',
        component: ProphylacticReportsComponent
    },
    {
        path:'add-prophylactic-reports',
        loadChildren:()=>import('../prophylactic-reports/add-prophylactic-report/add-prophylactic-report.module').then(m=>m.AddProphylacticReportModule)
    },
    {
        path:'view-prophylactic-reports',
        loadChildren:()=>import('../prophylactic-reports/add-prophylactic-report/add-prophylactic-report.module').then(m=>m.AddProphylacticReportModule)
    }
];

@NgModule({
    declarations: [
        ProphylacticReportsComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class  ProphylacticModule {
}
