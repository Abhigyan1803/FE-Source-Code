
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PendingCvrCasesComponent } from './pending-cvr-cases.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddCvrComponent } from './add-cvr/add-cvr.component';

const routes = [
    {
        path: '',
        component: PendingCvrCasesComponent
    },
    {
        path:'add-cvr',
        loadChildren:()=>import('../pending-cvr-cases/add-cvr/add-cvr.module').then(m=>m.AddCvrModule)
    },
    {
        path:'view-cvr',
        loadChildren:()=>import('../pending-cvr-cases/add-cvr/add-cvr.module').then(m=>m.AddCvrModule)
    }
];

@NgModule({
    declarations: [
        PendingCvrCasesComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class PendingCvrCasesModule {
}
