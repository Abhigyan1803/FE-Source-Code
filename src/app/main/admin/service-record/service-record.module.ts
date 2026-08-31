import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceRecordComponent } from './service-record.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddRecordComponent } from './add-record/add-record.component';
import { MaterialModule } from 'app/material/material.module';

const routes = [
    {
        path: '',
        component: ServiceRecordComponent
    },
    { path: 'add-record', loadChildren: () => import('./add-record/add-record.module').then(m => m.AddRecordModule) },
    { path: 'view-record', loadChildren: () => import('./add-record/add-record.module').then(m => m.AddRecordModule) },
];

@NgModule({
    declarations: [
        ServiceRecordComponent,
      
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
      
    ]
})

export class ServiceRecordModule {
}
