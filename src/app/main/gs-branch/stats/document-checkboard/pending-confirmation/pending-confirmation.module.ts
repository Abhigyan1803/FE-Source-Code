
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PendingConfirmationComponent } from './pending-confirmation.component';
// import { MatCardModule, MatIconModule, MatMenuModule, MatTabsModule, MatProgressBarModule,
//      MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTableModule,
//       MatTooltipModule, MatPaginatorModule, MatDatepickerModule, MatDividerModule, MatChipsModule, MatListModule } from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ChartsModule } from 'ng2-charts';
import {MaterialModule} from 'app/material/material.module';
import { AddPendingComponent } from './add-pending/add-pending.component';

const routes = [
    {
        path: '',
        component: PendingConfirmationComponent
    },
    {
        path:'add-pending-confirmation',
        loadChildren:()=>import('../pending-confirmation/add-pending/add-pending.module').then(m=>m.AddPendingModule)
    },
    {
        path:'view-pending-confirmation',
        loadChildren:()=>import('../pending-confirmation/add-pending/add-pending.module').then(m=>m.AddPendingModule)
    }
];

@NgModule({
    declarations: [
        PendingConfirmationComponent,
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
        MaterialModule
       ]
})

export class PendingConfirmationModule {
}
